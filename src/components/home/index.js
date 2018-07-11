import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Tabs from 'antd/lib/tabs';
import BackTop from 'antd/lib/back-top';
import styled from 'styled-components';
import {
    T1
} from '../base/base-component';
import ResourceItem from './resource-item';

const TabPane = Tabs.TabPane;
const HomeBody = styled.div`
    padding: 30px 50px;
`;
const ItemsBody = styled(InfiniteScroll)`
    display: flex;
    flex-wrap: wrap;
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
            return <ResourceItem key={movie.id} file={movie}/>
        });
        return (
            <HomeBody>
                <BackTop/>
                <T1 style={{
                    margin: '0 auto',
                    textAlign: 'center',
                    marginBottom: '20px',
                }}>RESOURCE CENTER</T1>
                <Tabs tabPosition={'left'} type={'line'}>
                    <TabPane tab={'所有资源'} key={'1'}>
                        <ItemsBody
                            pageStart={0}
                            loadMore={loadMore}
                            hasMore={hasMore && !loading}       //如果还有更多的数据，并且不处于加载状态就会继续加载更多
                            loader={<div className="loader">Loading ...</div>}>
                            {movieItems}
                        </ItemsBody>
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