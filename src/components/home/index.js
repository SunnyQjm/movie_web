import React from 'react';

class HomeComponent extends React.Component{
    componentDidMount(){
        let {isMobile} = this.props;
    }
    render(){
        return (
            <div>HomePage</div>
        );
    }
}

export default HomeComponent;