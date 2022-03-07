interface Date {
    /** Format to date string, "yyyy-MM-dd" => 2000-01-01 */
    format: (fmt: string) => string;
    addSeconds: (seconds: number) => Date;
    addMinutes: (minutes: number) => Date;
    addHours: (hours: number) => Date;
    addDays: (days: number) => Date;
    addMonths: (months: number) => Date;
    addYears: (years: number) => Date;
    timeDiff: (maxUnit: string) => Object;
  }
  
  Date.prototype.format = function(fmt) {
    var o = {
      'M+': this.getMonth() + 1, //月份
      'd+': this.getDate(), //日
      'h+': this.getHours(), //小時
      'm+': this.getMinutes(), //分
      's+': this.getSeconds(), //秒
      'q+': Math.floor((this.getMonth() + 3) / 3), //季度
      S: this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp('(' + k + ')').test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
        );
    return fmt;
  };
  
  Date.prototype.addSeconds = function(seconds) {
    this.setSeconds(this.getSeconds() + seconds);
    return this;
  };
  
  Date.prototype.addMinutes = function(minutes) {
    this.setMinutes(this.getMinutes() + minutes);
    return this;
  };
  
  Date.prototype.addHours = function(hours) {
    this.setHours(this.getHours() + hours);
    return this;
  };
  
  Date.prototype.addDays = function(days) {
    this.setDate(this.getDate() + days);
    return this;
  };
  
  Date.prototype.addMonths = function(months) {
    this.setMonth(this.getMonth() + months);
    return this;
  };
  
  Date.prototype.addYears = function(years) {
    this.setFullYear(this.getFullYear() + years);
    return this;
  };
  
  function diffSeconds(milliseconds:any) {
    return Math.floor(milliseconds / 1000);
  }
  
  function diffMinutes(milliseconds:any) {
    return Math.floor(milliseconds / 1000 / 60);
  }
  
  function diffHours(milliseconds:any) {
    return Math.floor(milliseconds / 1000 / 60 / 60);
  }
  
  function diffDays(milliseconds:any) {
    return Math.floor(milliseconds / 1000 / 60 / 60 / 24);
  }
  
  Date.prototype.timeDiff = function(maxUnit) {
    maxUnit = maxUnit || 'hours';
    var timediff = this > new Date() ? (this.getTime() - new Date().getTime()) : 0;
    var result = { days: 0, hours: 0, mins: 0, secs: 0, totalms: timediff };
    switch (maxUnit) {
      case 'days':
        result.days = Math.floor(timediff / (24 * 60 * 60 * 1000));
        result.hours = new Date(timediff).getUTCHours();
        break;
      case 'hours':
        result.hours = Math.floor(timediff / (60 * 60 * 1000));
        break;
    }
    result.mins = new Date(timediff).getUTCMinutes();
    result.secs = new Date(timediff).getUTCSeconds();
    return result;
  };