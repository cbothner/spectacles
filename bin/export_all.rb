# frozen_string_literal: true

require 'selenium-webdriver'
require 'capybara'
require 'capybara/dsl'
require 'pry'

class ExportAll
  include Capybara::DSL

  def run
    setup
    login

    find('span.pt-tag', match: :first)
    all('span.pt-tag').each { |row| make_pdf row }
  end

  private

  def setup
    Capybara.register_driver :chrome do |app|
      Capybara::Selenium::Driver.new app, browser: :chrome
    end

    Capybara.register_driver :headless_chrome do |app|
      capabilities = Selenium::WebDriver::Remote::Capabilities.chrome(
        chrome_options: { args: %w[headless disable-gpu] }
      )

      Capybara::Selenium::Driver.new app,
                                     browser: :chrome,
                                     desired_capabilities: capabilities
    end
    Capybara.default_driver = ENV['NOT_HEADLESS'] ? :chrome : :headless_chrome

    Capybara.app_host = 'https://spectacles.herokuapp.com'
    Capybara.run_server = false

    Capybara.default_max_wait_time = 10
  end

  def login
    visit '/'
    fill_in 'Email', with: ENV['SPECTACLES_USERNAME']
    fill_in 'Password', with: ENV['SPECTACLES_PASSWORD']
    click_button 'Submit'
  end

  def make_pdf(row)
    return if row.text == '—'
    row.click
    sleep(2)
    while page.driver.browser.window_handles.length < 2
      sleep(1)
      find('.pt-icon-print').click
    end
    page.driver.browser.switch_to.window page.driver.browser.window_handles.last
    until page.has_button?('Save', wait: 0)
      click_button 'Change'
      find('span.destination-list-item-name[title="Save as PDF"]', match: :first).click
      find('a', text: 'More settings').click
      select 'None'
      check 'Background graphics'
    end
    click_button 'Save'
    page.driver.browser.switch_to.window page.driver.browser.window_handles.first
    sleep(1) while page.driver.browser.window_handles.length > 1
    click_button 'Cancel'
  end
end

ExportAll.new.run
