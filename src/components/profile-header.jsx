import React from 'react';

export default class ProfileHeader extends React.Component {

	render() {
		return (
			<div className="row user-header p-y-2">
	      <div className="col-md-offset-2 col-md-8 p-y-4">
	        <div className="media">
              <img src="../../resources/theterminator.jpg"/>
            <div className="media-body p-l-6">
              <h2 className="media-heading m-t-15">The Terminator</h2>
              <h4><strong>Terminator</strong> I am a robot from the future</h4>
              <h4><strong>Profile</strong></h4>
              <ul className="header-ul">
                <li><strong>100</strong> posts</li>
                <li><strong>500k</strong> followers</li>
                <li><strong>200</strong> following</li>
              </ul>
            </div>
          </div>
        </div>
	    </div>
		);
	}
}
