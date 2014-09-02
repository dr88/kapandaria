class Classified < ActiveRecord::Base
  belongs_to :user

  def self.search query
    unless query.blank?
      classifieds = where("LOWER(classifieds.title)     LIKE :query
                        OR LOWER(classifieds.location)  LIKE :query
                        OR LOWER(classifieds.body)      LIKE :query
                        OR LOWER(classifieds.last_line) LIKE :query", query: "%#{query.downcase}%")
    else
      all
    end
  end
end
