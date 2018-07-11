import React from 'react';

class DetailComponent extends React.Component {


    componentDidMount(){
        let {match, passResource, updateResourceInfo, getResourceById} = this.props;
        if(passResource)        //如果外边传入了数据就先显示传入的数据
            updateResourceInfo(passResource);
        getResourceById(match.params.id);
    }
    render() {
        let {match, resource} = this.props;
        if(!resource)
            resource = {};
        return (
            <div>
                <p>{resource.movieName}</p>
                Detail of {match.params.id}
            </div>
        );
    }
}

export default DetailComponent;