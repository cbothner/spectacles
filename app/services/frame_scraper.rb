# frozen_string_literal: true

require 'open-uri'

class FrameScraper
  def initialize(filter_name)
    @filter_name = filter_name.downcase
  end

  # Scrapes the NoIR website for the frames a given filter is available in and
  # returns a set of images of those frames in this filter
  #
  # @return Hash{name => image_url}
  def available_frames
    @available_frames ||= scrape_frames
  end

  private

  def scrape_frames
    content = fetch_product_page
    frame_image_urls = find_frame_image_urls content
    build_hash frame_image_urls
  end

  def fetch_product_page
    Nokogiri::HTML open product_page_url
  end

  def product_page_url
    "http://noirlaser.com/#{@filter_name}.html"
  end

  def find_frame_image_urls(content)
    nodes = content.css('.frame-div a')
    nodes.map { |node| node.attr(:href) }
  end

  def build_hash(frame_image_urls)
    frame_image_urls.each_with_object({}) do |image_url, hash|
      frame_name = extract_name image_url
      hash[frame_name] = image_url
    end
  end

  # From a url like noirlaser.com/...7136e95/a/g/ag3_40.jpg extract 40
  def extract_name(image_url)
    image_url[/(?<=#{@filter_name}[-_])\w+(?=\.jpg)/]
  end
end
