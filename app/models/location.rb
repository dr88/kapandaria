class Location < ActiveRecord::Base
	validates :name, presence: true, uniqueness: {case_sensitive: false}
	has_and_belongs_to_many :listings

  before_save :capitalize

  private

    def capitalize
      self.name = self.name.split.map(&:capitalize).join(' ')
    end
end
