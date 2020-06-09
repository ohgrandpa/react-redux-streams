import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux'; 
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
	componentDidMount() {
		console.log("Mounted! Fetching stream...");
		this.props.fetchStream(this.props.match.params.id);
	}

	onSubmit = (formValues) => {
		console.log("Editing stream")
		this.props.editStream(this.props.stream.id, formValues);
	}

	render() {
		console.log("Props:");
		console.log(this.props);
		if (!this.props.stream) {
			return <div>Loading...</div>;
		}
		console.log("Picked fields:");
		console.log(_.pick(this.props.stream, "title", "description"));
		return (
			<div>
				<h3>Edit a Stream</h3>

				<StreamForm 
					initialValues={_.pick(this.props.stream, "title", "description")}
					onSubmit={this.onSubmit} 
				/>
			</div>
		);
	}
};

const mapStateToProps = (state, ownProps) => {
	return { stream: state.streams[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);