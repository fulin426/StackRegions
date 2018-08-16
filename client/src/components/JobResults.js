import React, { Component } from 'react';
import { connect } from 'react-redux';

class JobResults extends Component {
	render() {
		
	if (this.props.resultSet) {
	const jobResults = this.props.results.map((listing, index) => 
		<div key={index}>
			<a href={listing.link} target="_blank">
				{listing.title}
			</a>
			<p>Categories: {listing.category}</p>

		</div>
		);
		return (
			<div>
				<h3>Jobs Results</h3>
				<div>
					{jobResults}
				</div>
			</div>
		);
		} else {
			return (
				<div></div>
			);
		}
	}
}

const mapStateToProps = state => ({
  results: state.jobs.setResults,
  resultSet: state.jobs.resultSet
});

export default connect(mapStateToProps)(JobResults);