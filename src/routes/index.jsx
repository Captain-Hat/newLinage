import React from 'react';
import { connect } from 'dva';
import Mytable from '../components/Table';
import styles from './index.less';
import { Button, Carousel, Menu } from 'antd';
import { Link } from 'dva/router';


// 轮播图片
import img_4 from '../assets/course1.png'
import img_5 from '../assets/course2.png'
import img_6 from '../assets/course.png'

import img_7 from '../assets/album.png'

import hammer from '../assets/hammer.png'

const Index = ({ dispatch, items, gamerInfo, gamerInfo2, updateItem, className }) => {
    let total = 0;
    let jobs = {
        '王族': 0,
        '骑士': 0,
        '妖精': 0,
        '法师': 0,
        '黑妖': 0,
        '龙骑': 0,
        '幻术': 0
    };
    gamerInfo.map((v, k) => {
        total = total + (+v.count);
        switch (v.type) {
            case '0':
                jobs['王族'] = v.count
                break;
            case '1':
                jobs['骑士'] = v.count
                break;
            case '2':
                jobs['妖精'] = v.count
                break;
            case '3':
                jobs['法师'] = v.count
                break;
            case '4':
                jobs['黑妖'] = v.count
                break;
            case '5':
                jobs['龙骑'] = v.count
                break;
            case '6':
                jobs['幻术'] = v.count
                break;
            default:
                break;
        }
    })
    const showVideo = '<embed width="425" height="300" allownetworking="all" allowscriptaccess="always" src="https://staticlive.douyucdn.cn/common/share/play.swf?room_id=3299845" quality="high" bgcolor="#f00" wmode="window" allowfullscreen="true" allowFullScreenInteractive="true" type="application/x-shockwave-flash">'
    let changeItem = (item) => {
        dispatch({
            type: 'index/changeNotice',
            payload: item.key,
        });
    }
    let createUpdate = () => {
        let update = []
        updateItem.slice(0, 8).map((v, k) => {
            update.push(
                <Link key={k} className={styles.updateLink} to={{ pathname: '/article', state: { id: v.id } }} ><a href="#">{v.item}</a></Link>
            )
        })
        return update
    }


    // <li style={{ color: 'red' }}>火山：20:00--22:00  05:07</li>
    // <li>肯特：血盟-爱地球</li>
    // <li>妖堡：沦陷中</li>
    let createSiege = () => {
        let siege = []
        gamerInfo2.map((v, k) => {
            if (v.type == '1') {
                siege.push(
                    <li key={k} style={{ color: 'red' }}>{v.name}：{v.war_time}</li>
                )
            } else {
                siege.push(
                    <li key={k}>{v.name}：沦陷中</li>
                )
            }

        })
        return siege
    }
    return (
        <div className={styles.cardContainer}>
            <div className={styles.flexBox}>
                <div className={styles.topCourse}>
                    <div style={{ width: "1000px", height: '245px' }}>
                        <Carousel autoplay>
                            {/* <div> <img className={styles.courseImg} src={img_4} alt="" /></div> */}
                            <div> <img className={styles.courseImg} src={img_5} alt="" /></div>
                            <div> <img className={styles.courseImg} src={img_6} alt="" /></div>
                        </Carousel>
                    </div>
                </div>
            </div>
            <div className={styles.flexBox}>
                <div className={styles.left}>
                    <div className={styles.announceList}>
                        <div style={{ background: 'transparent', marginBottom: "20px" }}>
                            <Menu
                                className={styles.menu}
                                theme="dark"
                                mode="horizontal"
                                //selectedKeys={[this.state.selectedKeys]}
                                onClick={changeItem}
                            >
                                <Menu.Item key="1">
                                    <a href="javascript:;">综合公告</a>
                                </Menu.Item>
                                <Menu.Item key="2">
                                    <a href="javascript:;">游戏说明</a>
                                </Menu.Item>
                                <Menu.Item key="3">
                                    <a href="javascript:;">活动</a>
                                </Menu.Item>
                                <Menu.Item key="4">
                                    <a href="javascript:;">更新与修复</a>
                                </Menu.Item>
                            </Menu>
                        </div>
                        <Mytable className={className} items={items} />
                        <div style={{ textAlign: "right", marginTop: '10px', paddingRight: '16px' }}>
                            <Link className={styles.myLink} style={{ fontSize: "13px" }} to="/announcementList">more</Link>
                        </div>
                    </div>
                    <div className={styles.annouceBottom}>
                        <div className={styles.album}>
                            <img src={img_7} alt="" />
                        </div>
                        <div className={styles.gamerCounts}>
                            <ul>
                                <li>实时在线玩家：{total}</li>
                                <li><span style={{ marginRight: '15px' }}>王族：{jobs['王族']}</span><span>黑暗精灵：{jobs['黑妖']}</span></li>
                                <li><span style={{ marginRight: '15px' }}>骑士：{jobs['骑士']}</span><span>龙骑士：{jobs['龙骑']}</span></li>
                                <li><span style={{ marginRight: '15px' }}>法师：{jobs['法师']}</span><span>幻术师：{jobs['幻术']}</span></li>
                                <li><span style={{ marginRight: '15px' }}>精灵：{jobs['妖精']}</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={styles.center}>
                    <div className={styles.video} dangerouslySetInnerHTML={{ __html: showVideo }}>
                    </div>
                    <div className={styles.market}>
                        <div className={styles.innerItem} style={{ marginRight: '3px', flex: "1" }}>
                            <img style={{ width: '100%', height: '100%' }} src={hammer} alt="" />
                        </div>
                        <div className={styles.innerItem} style={{ marginRight: '3px', width: "90px", background: 'transparent', fontSize: '14px' }}>
                            <Link to="/registration"><div className={styles.btn}>帐号注册</div></Link>
                            <Link to="/downloadPage"><div className={styles.btn}>下载中心</div></Link>
                            <Link to="/friendHelp"><div className={styles.btn}>赞助我们</div></Link>
                        </div>
                        <div className={styles.innerItem} style={{ width: "125px", paddingLeft: '14px', paddingTop: "5px" }}>
                            <ul>
                                <li>服务器简介：</li>
                                <li>经验：5倍</li>
                                <li>金币：1倍</li>
                                <li>掉宝：1倍</li>
                                <li>好友度：5倍</li>
                                <li>负重：2倍</li>
                            </ul>
                        </div>
                    </div>

                    <div className={styles.service}>
                        <div className={styles.worTime}>
                            <ul>
                                <li>客户服务：</li>
                                <li>客服qq：2562186390</li>
                                <li>客服微信：MaskedMonkey</li>
                                {/* <li>客服微信：2562186390@qq.com</li> */}
                                {/* <li>工作时间：18:30-21.30 每天</li> */}
                            </ul>
                        </div>
                        <div className={styles.qqLeague}>
                            <ul>
                                <li>&nbsp;</li>
                                <li>qq群（2000）：539891495</li>
                                <li style={{ color: 'red', paddingLeft: '69px' }}> <a target="_blank" href="//shang.qq.com/wpa/qunwpa?idkey=e4e2b062a64c5c976ae6a069bf4347f41db57b2eda22a1e7d7b05fbd61d78495"><img src="//pub.idqqimg.com/wpa/images/group.png" alt="天堂1-东方骑士3.52" title="天堂1-东方骑士3.52" /></a></li>

                                {/* <li>官方YY频道：21267952</li> */}
                                {/* <li style={{ color: 'red' }}>点击进入官方YY</li> */}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.rightTop}>
                        <span className={styles.title}>攻城信息表：</span>
                        <ul className={styles.siege}>
                            {/* <li style={{ color: 'red' }}>火山：20:00--22:00  05:07</li>
                            <li>肯特：血盟-爱地球</li>
                            <li>妖堡：沦陷中</li>
                            <li>风木：沦陷中</li>
                            <li>奇岩：沦陷中</li>
                            <li>海音：沦陷中</li>
                            <li>亚丁：沦陷中</li>
                            <li>抵押的要塞：沦陷中</li> */}
                            {createSiege()}
                        </ul>
                    </div>
                    <div className={styles.rightBottom}>
                        <span className={styles.title}>服务器的优化和功能：</span>
                        <ul className={styles.funcs}>
                            {/* <li><a href="#">天气系统</a></li>
                            <li><a href="">网站数据库查询APP</a></li>
                            <li><a href="">网站拍卖行APP</a></li>
                            <li><a href="">帐号注册系统</a></li>
                            <li><a href="">自动数据备份</a></li>
                            <li><a href="">减少垃圾东西的掉落</a></li>
                            <li><a href="">修复了很多常见bug</a></li>
                            <li><a href="">长期稳定</a></li> */}
                            {createUpdate()}
                        </ul>
                        <div style={{ textAlign: "right" }}>
                            <Link className={styles.myLink} style={{ fontSize: "13px", paddingRight: '15px' }} to="/announcementList">more</Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default connect((state) => ({
    items: state.index.items.slice(0, 8),
    gamerInfo: state.index.gamerInfo,
    gamerInfo2: state.index.gamerInfo2,
    updateItem: state.index.updateItem,
    className: 'announcement'
}))(Index);

// function mapStateToProps(state) {
//     const { items } = state.index;
//     return {
//         items
//     };
// }

// export default connect(mapStateToProps)(Index);