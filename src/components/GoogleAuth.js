import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
	componentDidMount() {
		window.gapi.load('client:auth2', () => {
			window.gapi.client.init({
				clientId: "269410448477-m6ssjeapep3vrhh5aqlied9o8ibjg1q0.apps.googleusercontent.com",
				scope: 'email'
			}).then(() => {
				this.auth = window.gapi.auth2.getAuthInstance();
				this.onAuthChange(this.auth.isSignedIn.get());
				this.auth.isSignedIn.listen(this.onAuthChange);
			});
		});
	}

	onAuthChange = (isSignedIn) => {
		if (isSignedIn) {
			this.props.signIn(this.auth.currentUser.get().getId());
		} else {
			this.props.signOut();
		}
	};

	signOutClick = () => {
		this.auth.signOut();
	};

	signInClick = () => {
		this.auth.signIn();
	};

	renderAuthButton() {
		if (this.props.isSignedIn === null) {
			return null;
		} else if (this.props.isSignedIn) {
			return (
				<button 
					className="ui button google red"
					onClick={this.signOutClick}
				>
					<i className="google icon" />
					Sign Out
				</button>				
			)
		} else {
			return (
				<button 
					className="ui button google red"
					onClick={this.signInClick}
				>
					<i className="google icon" />
					Sign In with Google
				</button>
			);
		}
	}

	render() {
		return (
			<div>
				{this.renderAuthButton()}
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);