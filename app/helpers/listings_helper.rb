module ListingsHelper

  def user_is_a_seller?
    how_many_listings = Listing.where(user: current_user).count
    return (how_many_listings > 0)
  end	
  
end

