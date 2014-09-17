class Gemach < ActiveRecord::Base
  belongs_to :user

  def self.search query
    unless query.blank?
      gemachs = where("LOWER(gemachs.title)     LIKE :query
                        OR LOWER(gemachs.location)  LIKE :query
                        OR LOWER(gemachs.body)      LIKE :query
                        OR LOWER(gemachs.last_line) LIKE :query", query: "%#{query.downcase}%")
    else
      all
    end
  end
end
