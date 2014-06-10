module ApplicationHelper

	# Displays the time in x seconds ago, y minutes ago ..." "
	# adapted from http://stackoverflow.com/questions/3063256/ruby-on-rails-global-helper-method-for-all-controllers
	def relative_time(start_time)

	  diff_seconds = Time.now - start_time
	  time_displayed = "about "
	  case diff_seconds
	    when 0 .. 59
	      time_displayed += "#{diff_seconds.round} seconds ago"
	    when 60 .. (3600-1)
	      time_displayed += "#{(diff_seconds/60).round} minutes ago"
	    when 3600 .. (3600*24-1)
	      time_displayed +=  "#{(diff_seconds/3600).round} hours ago"
	    when (3600*24) .. (3600*24*30) 
	      time_displayed +=  "#{(diff_seconds/(3600*24)).round} days ago"
	    else
	      time_displayed start_time.strftime("B %-d, %Y")
	  end
	  return time_displayed
	end

end
