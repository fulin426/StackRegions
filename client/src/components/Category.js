import React, { Component } from 'react';
import { connect } from 'react-redux';
const start = 0;
const stop = 5;

class Category extends Component {  

	nextButton = () => {
		start += 5;
		stop += 5 ;

		console.log(start);
		console.log(stop);
	}

	render() {
	const returned = this.props.jobs.returned;
  let Categories;

    if (returned === true) {
    	let items = this.props.jobs.jobs.rss.channel.item
      let arry = [];
      items.forEach(item => 
        arry = arry.concat(item.category)
      );

      /*San Mateo location cannot read of undefined*/
      let skillsObj = {};
      for (let i=0; i<arry.length; i++) {
        if (skillsObj[arry[i]._text]) {
          skillsObj[arry[i]._text]++;
        } else {
          skillsObj[arry[i]._text] = 1
        }
      }

      for (let i=0; i<arry.length; i++) {
        if (skillsObj[arry[i]._text]) {
          skillsObj[arry[i]._text]++;
        } else {
        skillsObj[arry[i]._text] = 1
        }
      }

      let sortable = [];
      for (let skill in skillsObj) {
        sortable.push([skill, skillsObj[skill]]);
      }

      sortable.sort(function(a,b) {
      return b[1]-a[1];
      });
      
      let slicedSortable = sortable.slice(start, stop);
      let sortedItems = [];

      for (let i=0; i<slicedSortable.length; i++) {
        sortedItems.push({text: slicedSortable[i][0] });
      }

      Categories = sortedItems.map((category, index) =>
        <li key={index}>
          {category.text}
        </li>
      );
    }

		return (
			<div>
				<br />
				<h3>Do you have these skills?</h3>
				<ul>
					{Categories}
				</ul>
				<button onClick={this.nextButton}>
				Next
				</button>
			</div>
		);
	}
}

const mapStateToProps = state => ({
  jobs: state.jobs
});

export default connect(mapStateToProps)(Category);