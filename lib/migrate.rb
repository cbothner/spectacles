# frozen_string_literal: true

require 'optparse'
require 'csv'
require 'active_support'
require 'active_support/core_ext/object/blank'
require 'active_support/core_ext/object/json'
require 'pry'

TEX_SPEC_HEADERS = %w[Filter CE OD L-Rating Cost Color VLT].freeze

def fatal_error(message)
  $stderr.puts message
  exit
end

options = {}

opt_parser = OptionParser.new do |opt|
  opt.banner = 'Usage: ruby ./migrate.rb FILTERS SPECTRO_DIR | rails c'
  opt.separator ''
  opt.separator 'FILTERS should be a TexSpec formatted CSV file.'
  opt.separator 'SPECTRO_DIR should be a directory of spectrophotometer_data CSVs.'
  opt.separator ''
  opt.separator 'Options'

  opt.on('-h', '--help', 'Print this help message') do
    fatal_error opt_parser
  end
end

opt_parser.parse!

FILENAME = ARGV[0]
SPECTRO_DIR = ARGV[1]
fatal_error opt_parser unless FILENAME && SPECTRO_DIR

begin
  csv_text = File.read FILENAME
rescue IOError
  fatal_error "Error: File '#{FILENAME}' does not exist or cannot be read"
end
csv = CSV.parse csv_text, headers: true

headers = csv.headers
unless TEX_SPEC_HEADERS.all? { |header| headers.include? header }
  fatal_error <<~END
    Error: Malformed file.
           CSV content must include all the following columns:
           #{TEX_SPEC_HEADERS.join ', '}
    END
end

class FilterRow
  class SpectrophotometerData
    attr_reader :data

    def initialize(name)
      @name = name
      contents = read_csv
      @data = parse_csv contents
    end

    private

    def read_csv
      spectro_filename = File.join SPECTRO_DIR, "#{@name}.csv"
      begin
        contents = File.read spectro_filename
      rescue IOError
        fatal_error "Error: File '#{spectro_filename}' does not exist " \
                    'or cannot be read'
      end
      contents
    end

    def parse_csv(contents)
      csv = CSV.parse contents, headers: true

      headers = csv.headers
      unless %w[wavelength OD %T].all? { |header| headers.include? header }
        fatal_error <<~END
          Error: Malformed file.
                 CSV content must include all the following columns:
                 #{%w[wavelength OD %T].join ', '}
          END
      end

      csv.map { |row| build_data_hash row }
    end

    def build_data_hash(row)
      {
        wavelength: row['wavelength'].to_f,
        od: row['OD'].to_f,
        transmittance: row['%T'].to_f
      }
    end
  end

  attr_reader :name, :ce, :base_price, :color, :vlt, :ods, :l_ratings,
              :spectrophotometer_data

  def initialize(row)
    @name = row['Filter']
    @ce = row['CE'] == 'Yes'
    @base_price = row['Cost'].sub('$', '').to_f
    @color = row['Color']
    @vlt = row['VLT'].to_i
    @ods = latex_table_to_range_list(row['OD'])
    @l_ratings = latex_table_to_range_list(row['L-Rating'])
    @spectrophotometer_data = SpectrophotometerData.new(@name).data
  end

  def to_s
    "Filter.create name: #{name.inspect}, ce: #{ce}, " \
                  "base_price: #{base_price}, color: #{color.inspect}, " \
                  "vlt: #{vlt}, ods: #{ods}, "\
                  "l_ratings: #{l_ratings}, " \
                  "spectrophotometer_data: #{spectrophotometer_data}"
  end

  private

  def latex_table_to_range_list(table)
    table ||= ''
    latex_rows = table.split('\\\\').reject(&:blank?).map(&:strip)
    pairs = latex_rows.map { |row| row.split('&').map(&:strip) }
    pairs.map { |range, value| { range: range.gsub('--', '–'), value: value } }
  end
end

csv.each do |row|
  puts FilterRow.new(row)
end
