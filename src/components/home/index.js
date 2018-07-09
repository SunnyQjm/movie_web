import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Tabs from 'antd/lib/tabs';
import BackTop from 'antd/lib/back-top';
import styled from 'styled-components';

const TabPane = Tabs.TabPane;
const HomeBody = styled.div`
    padding: 50px;
`;

class HomeComponent extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        let {isMobile} = this.props;
    }

    render(){
        let {items, loadMore, hasMore, loading} = this.props;
        let movieItems = items.map((movie, index) => {
            return <p key={index}>{movie.movieName}</p>
        });
        return (
            <HomeBody>
                <BackTop/>
                <Tabs tabPosition={'left'} type={'line'}>
                    <TabPane tab={'所有资源'} key={'1'}>
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={loadMore}
                            hasMore={hasMore && !loading}       //如果还有更多的数据，并且不处于加载状态就会继续加载更多
                            loader={<div className="loader">Loading ...</div>}>
                            {movieItems}
                        </InfiniteScroll>
                    </TabPane>
                    <TabPane tab={'已下载'} key={'2'}>
                        B
                    </TabPane>
                </Tabs>
            </HomeBody>

        );
    }
}

export default HomeComponent;