import fetch from 'isomorphic-fetch';
import { store } from '../init.jsx';
import { getAvailabilityEndpoint, getUpdateCalPreferencesEndpoint } from '../constants.jsx';

export function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export function fetchAvailability(weekOffset) {
	return (dispatch) => {
		let state = store.getState();
		let ids = state.dtmCalendars.calendars.map(c => c.id);
		fetch(getAvailabilityEndpoint(), {
			method: 'POST',
			headers: {
				'X-CSRFToken': getCookie('csrftoken')
			},
			body: JSON.stringify({
				cal_ids: ids,
				week_offset: (weekOffset) ? weekOffset : 0
			}),
			credentials: 'same-origin',
		})
		.then(response => response.json())
		.then(json => {
			dispatch({
				type: "RECEIVE_AVAILABILITY",
				availability: json
			})
		})
	}
}	

export function getCalendarColorFromId(cid) {
	return (dispatch) => {
		let state = store.getState();
		let cal = state.dtmCalendars.calendars.find(c => c.id == cid);
		return cal.color;
	}
}

export function updateCalendarPreferences() {
	return (dispatch) => {
		let state = store.getState().dtmCalendars.calendars;
		let json = state.reduce((json,cal) => {
			json[cal.id] = cal.visible;
			return json;
		}, {})
		fetch(getUpdateCalPreferencesEndpoint(), {
			method: 'POST',
			headers: {
				'X-CSRFToken': getCookie('csrftoken')
			},
			body: JSON.stringify(json),
			credentials: 'same-origin',
		})
	}
}