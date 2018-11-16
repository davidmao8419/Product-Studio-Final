import React from 'react';
import { connect } from 'react-redux';
import Spinner from './spinner';
//import {TrendTopic} from './googleAPI';
import {
	uploadImage,
	postImage,
	setFilters
} from '../action-creators';
//import ImgToBase64 from 'react-native-image-base64';
//const visionG = require('@google-cloud/vision');
//const clientG = new visionG.ImageAnnotatorClient();

var url = 'https://cdn.filestackcontent.com/4WR651VSSant2nzj6BvQ';

function getKeywords(url) {
	return fetch('/keywords', {
		method: 'POST',
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			"data": url
		})
	})
}
var arr=[];
export class Add extends React.Component {
	createFilterUrl() {
		const filterOptions = document.getElementsByClassName('filter-options');
		let selectedFilters = [];
		for(let i = 0; i < filterOptions.length; i++) {
			if(filterOptions[i].checked) {
				selectedFilters.push(filterOptions[i].value);
			}
		}
		this.props.setFilters(selectedFilters.join('/') + '/');
	}
	getImageUrl() {
		console.log(`https://process.filestackapi.com/${this.props.filter}${this.props.image}`);
		return this.props.image ? `https://process.filestackapi.com/${this.props.filter}${this.props.image}` : ``;
	}

	getLabels() {
		return this.props.image ? arr : ``;
	}

	getImageKeywords() {
		let url = `https://process.filestackapi.com/${this.props.filter}${this.props.image}`;
		console.log(url);
		let keywords = getKeywords(url).then(response => response.text())
		.then(json => {
			arr = json;
			console.log(arr);
			var res = arr.split('"');
			console.log(res);
			var mylist = document.getElementById('mylist');
			for(var i=5; i<res.length-1; i++) {
				if(res[i]==",") {
					continue;
				}
				mylist.insertAdjacentHTML('beforeend', "<li>"+res[i]+"</li>");
			}
			//arr = "<li>"+json+"</li>";
			//mylist.insertAdjacentHTML('beforeend', arr);
			return arr;
		})
		.catch(error => {
			//handle error
		});;
		console.log(arr);
		//var arr = [];
	}
			/*
		keywords.then(response => response.text())
			.then(json => {
				arr = json;
			})
			.catch(error => {
				//handle error
			});
			*/


			/*
		while(true) {
			if (isPaused) {
				setTimeout(function() {waitForIt(),100});
			}
			else{
				return arr;
			}
		}
		*/

		/*		
			setTimeout(function afterTenSeconds() {
				console.log("response");
				console.log(arr);
				console.log(arr['message']);
			}, 10000);
			*/
	
	render() {
		return (
			<div>
				{this.props.isLoading ?
					<Spinner /> :
					<div className="row">
						<div className="col-md-offset-2 col-md-8">
							<div className="panel panel-default">
								<div className="panel-heading">
									<h2 className="panel-title text-center">
										<span className="glyphicon glyphicon-upload" /> Upload an Image
									</h2>
								</div>
								<div className="panel-body">
									<form name="product-form" id="product-form" noValidate>
										<div className="form-group">
											<label >Upload image to </label>
											<div className="checkbox-group" onClick={() => this.createFilterUrl()}>
											  <div className="checkbox"><label><input type="checkbox" className="filter-options" value="sharpen" />Shutterstock</label></div>
											  <div className="checkbox"><label><input type="checkbox" className="filter-options" value="blur" />Getty</label></div>
											  <div className="checkbox"><label><input type="checkbox" className="filter-options" value="blackwhite" />Blablabla</label></div>
											</div>
										</div>
										<div className="form-group ">
						          <label htmlFor="picture">Picture</label>
						          <div className="text-center dropup">
						            <button id="button-upload" type="button" className="btn btn-default filepicker" onClick={() => this.props.uploadImage()}>
						              Upload <span className="caret" />
						            </button>
						          </div>

						          <div className="form-group text-center">
								  	<img className="img-responsive" src={this.getImageUrl()}></img>
								  </div>
									<button type="button" className="btn btn-filestack btn-block" onClick={() => this.getImageKeywords()}>Get Image Tags</button>
			
									
									<div>
									<label>Tags</label>
									<ul id="mylist">
									</ul>
								</div>
						          		<div className="form-group">
											<div className="checkbox-group" onClick={() => this.createFilterUrl()}>
											  <label >Title</label>
											  <div className="title"><input type="text" className="filter-options" placeholder="title" maxlength="4" size="70" /></div>
											  <br></br>
											  <label >Description</label>
											  <div className="desciprtion"><input type="text" className="filter-options" placeholder="desciprtion" maxlength="4" size="70"/></div>
											  
											</div>
											
											
										</div>
						        </div>
										<button type="button" className="btn btn-filestack btn-block" onClick={() => this.props.postImage()}>Submit</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				}
			</div>
		);
	}
}

function mapStateToProps(state) {
  return {
    image: state.get('upload').get('handle'),
    filter: state.get('upload').get('filters'),
		isLoading: state.getIn(['view', 'isLoading']),
		label: state.get('upload').get('handle')
  };
}
function mapDispatchToProps(dispatch) {
	return {
		uploadImage: () => dispatch(uploadImage()),
		setFilters: filters => dispatch(setFilters(filters)),
		postImage: () => dispatch(postImage())
	}
}
export const AddContainer = connect(mapStateToProps, mapDispatchToProps)(Add);
