import { SEARCH_JOBS } from '../actions/types';
import { ADD_CATEGORY } from '../actions/types';
import { SET_RETURNED_CATEGORIES } from '../actions/types';
import { DELETE_CATEGORY } from '../actions/types';
import { SET_NOTADDED_CATEGORIES } from '../actions/types';
import { DELETE_NOTADDED_CATEGORY } from '../actions/types';
import { SET_RESULTS } from '../actions/types';
import { SHOW_RENDERING } from '../actions/types';

const initialState = {
	jobs: {},
	query: false,
	returnedCategories: [],
	addedCategories: [],
	NotAddedCategories: [],
	setResults: [],
	renderbubble: "hide",
	resultSet: false,
	returned: false,
}

export default function(state = initialState, action) {
	switch(action.type) {
		case SEARCH_JOBS:
			let items = action.payload.rss.channel.item;
			if (action.payload.rss.channel['os:totalResults']._text ===  '0') {
				console.log('error no results');
				return {
					...state,
					jobs: 0,
					query: action.query,
					returned: true,
					returnedCategories:[],
					NotAddedCategories:[],
					addedCategories: [],
					setResults: [],
					renderbubble: "hide",
				}
			}
			let rawResults = [];
			items.forEach(item =>
				rawResults = rawResults.concat(item.category)
			);
			//filter out any undefined results so avoid errors
			let categoryArray = rawResults.filter(item => item !== undefined);
			//create character map
			let skillsObj = {};
			for (let i=0; i<categoryArray.length; i++) {
				if (skillsObj[categoryArray[i]._text]) {
					skillsObj[categoryArray[i]._text]++;
				} else {
					skillsObj[categoryArray[i]._text] = 1
				}
			}
			//
			// for (let i=0; i<categoryArray.length; i++) {
			// 	if (skillsObj[categoryArray[i]._text]) {
			// 		skillsObj[categoryArray[i]._text]++;
			// 	} else {
			// 	skillsObj[categoryArray[i]._text] = 1
			// 	}
			// }

			let sortable = [];
			for (let skill in skillsObj) {
				sortable.push([skill, skillsObj[skill]]);
			}

			sortable.sort(function(a,b) {
			return b[1]-a[1];
			});
			let slicedSortable = sortable.slice(0, 20);
			let sortedItems = [];
			for (let i=0; i<slicedSortable.length; i++) {
				sortedItems.push(slicedSortable[i][0]);
			}
			return {
				...state,
				jobs: action.payload,
				query: action.query,
				returned: true,
				returnedCategories:sortedItems,
				NotAddedCategories:sortedItems,
				addedCategories: [],
				setResults: [],
				renderbubble: "hide",
			}
		case SHOW_RENDERING:
			return {
				...state,
				returned: false,
				renderbubble: "show"
			};
		case SET_NOTADDED_CATEGORIES:
			let addedArry = state.returnedCategories;
			let toRemove = state.addedCategories;
			return {
				...state,
				NotAddedCategories: addedArry.filter(item => !toRemove.includes(item)),
			};
		case SET_RETURNED_CATEGORIES:
			return {
				...state,
				returnedCategories: action.returnedCategories,
			};
		case ADD_CATEGORY:
			const check = (category, arry) => {
				if (arry.includes(category) === true) {
					return arry;
				} else {
				return arry.concat(category);
				}
			}
			let arry = state.addedCategories;
			let category = action.newCategory;
			return {
				...state,
				addedCategories: check(category, arry),
			};
		case DELETE_CATEGORY:
			return {
				...state,
				addedCategories: state.addedCategories.filter(item => item !== action.deleteCategory),
			};
		case DELETE_NOTADDED_CATEGORY:
			return {
				...state,
				NotAddedCategories: state.NotAddedCategories.filter(item => item !== action.deleteNotAdded),
			};
		case SET_RESULTS:
			return {
				...state,
				resultSet: true,
				setResults: action.setResults
			};
		default:
			return state;
	}
}
