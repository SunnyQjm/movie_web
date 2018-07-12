import React from 'react';
import Anchor from 'antd/lib/anchor';
import styled from 'styled-components';

const {Link} = Anchor;



const LittleToolBody = styled.div`
    display: flex;
    flex-direction: row;
    padding: 30px 50px;
    width: 100%;
`;

const AnchorBody = styled(Anchor)`
    background-color: #fff0
    flex-grow: 0;
`;
const AnchorA = styled.a`
    width: 100%;
    height: 500px;
`;

const LittleToolContent = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 100;
    margin-left: 50px;
`;
class LittleToolComponent extends React.Component{
    render(){

        return (
            <LittleToolBody>
                <AnchorBody offsetTop={50}>
                    <Link href="#test1" title="便捷在线工具" />
                    <Link href="#test2" title="资源搜索网站" />
                    <Link href="#test3" title="Basic demo" />
                    <Link href="#test4" title="Basic demo" />

                </AnchorBody>

                <LittleToolContent id={'scroll-content'}>
                    <AnchorA id='test1'>
                        test1</AnchorA>
                    <AnchorA id='test2'>test2</AnchorA>
                    <AnchorA id='test3'>test3</AnchorA>
                    <AnchorA id='test4'>test4</AnchorA>
                    <a id="test4">
                        a
                    </a>
                </LittleToolContent>;
            </LittleToolBody>
        );
    }
}

export default LittleToolComponent;