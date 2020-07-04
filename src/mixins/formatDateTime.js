import { datetime } from '../config'

export default {
  computed: {
    $FORMAT_DATETIME () {
      return {
        DATE: datetime.FORMAT_DATE,
        TIME: datetime.FORMAT_TIME,
        DATETIME: datetime.FORMAT_DATETIME
      }
    }
  },
  methods: {
    timeSince (date) {
      if (typeof date !== 'object') {
        date = new Date(date)
      }
    
      var seconds = Math.floor((new Date() - date) / 1000)
      var intervalType
    
      var interval = Math.floor(seconds / 31536000)
      if (interval >= 1) {
        intervalType = 'year'
      } else {
        interval = Math.floor(seconds / 2592000)
        if (interval >= 1) {
          intervalType = 'month'
        } else {
          interval = Math.floor(seconds / 86400)
          if (interval >= 1) {
            intervalType = 'day'
          } else {
            interval = Math.floor(seconds / 3600)
            if (interval >= 1) {
              intervalType = 'hour'
            } else {
              interval = Math.floor(seconds / 60)
              if (interval >= 1) {
                intervalType = 'minute'
              } else {
                interval = seconds
                intervalType = 'second'
              }
            }
          }
        }
      }
    
      if (interval > 1 || interval === 0) {
        intervalType += 's'
      }
    
      return interval + ' ' + intervalType
    },
    toDateTime (secs) {
      var t = new Date(1970, 0, 1) // Epoch
      t.setSeconds(secs)
      return t
    }
    
  }
}
