import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteCategory } from '../actions/actions';
import { setNotAddedCategories } from '../actions/actions';
import { setResults } from '../actions/actions';

class AddedCategories extends Component {

	deleteCategory = (e) => {
		let selected = e.target.dataset.id;

		this.props.deleteCategory(selected);
		this.props.setNotAddedCategories();

    let listedSkills = this.props.addedCategories;
    listedSkills = listedSkills.filter( item => item !== selected);

    let jobResults = this.props.jobs.rss.channel.item
		this.props.setResults(jobResults, listedSkills);
	}

	render() {
		const displayCategories = this.props.addedCategories.map((category, index) =>
			<div key={index} className="Resulted-Categories" >
				<li
					key={index}
					className="Result-Skills Added"
					data-id={category}
					onClick={this.deleteCategory}
				>
					{category}
				</li>
			</div>
		);
		if (this.props.jobs !== 0) {
			return (
				<div className="Skills-Container">
					<h3>Skills You Know</h3>
					<ul>{displayCategories}</ul>
				</div>
			);
		} else {
			return(null);
		}
	}
}
const mapStateToProps = state => ({
  addedCategories: state.jobs.addedCategories,
  jobs: state.jobs.jobs,
  returned: state.jobs.returned,
  resultSet: state.jobs.resultSet
});

export default connect(mapStateToProps, { deleteCategory, setNotAddedCategories, setResults})(AddedCategories);
