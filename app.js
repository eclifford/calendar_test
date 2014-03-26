(function() {

  layOutDay = function(events) {
    var elements = [];

    // clear out container
    var element = document.getElementsByClassName('events-container');
    element[0].innerHTML = "";

    // sort by start ascending
    events.sort(function(a,b) {
      if (a.start > b.start)
        return 1;
      if (a.start < b.start)
        return -1
      return 0;
    });

    for(var i = 0; i < events.length; i++) {
      var event = document.createElement('div');
      event.className = 'event-item';
      event.style.top = events[i].start.toString() + "px"; 
      event.style.height = (events[i].end - events[i].start).toString() + "px";

      // test previous
      if(this.isOverlap(events[i], events[i-1])) {
        if(elements[i-1].classList.contains('right')) {
          event.className += ' left';
        } else {
          event.className += ' right';
          elements[i-1].className += ' left';
        }
      }

      elements.push(event);
    }

    for(var item in elements) {
      element[0].appendChild(elements[item]);
    }
  };

  isOverlap = function(event1, event2) {
    if (!event1 || !event2) 
      return false;
    if(event1.start >= event2.start && event1.start <= event2.end)
      return true;
    if(event1.end <= event2.end && event1.end >= event2.start) 
      return true;
    else
      return false;
  };

  return {
    layOutDay: layOutDay
  };

})();
