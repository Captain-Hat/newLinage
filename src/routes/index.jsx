import React from 'react';
import { connect } from 'dva';
import Mytable from '../components/Table';
import styles from './index.less';
import { Button, Carousel } from 'antd';
import { Link } from 'dva/router';

// 轮播图片
import img_1 from '../assets/img-1.png'
import img_2 from '../assets/img-2.png'
import img_3 from '../assets/img-3.png'
// 轮播图片
import img_4 from '../assets/course1.png'
import img_5 from '../assets/course2.png'
import img_6 from '../assets/course.png'

import img_7 from '../assets/album.png'

import hammer from '../assets/hammer.png'

const Index = ({ dispatch, items, gamerInfo, className }) => {
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
    return (
        <div className={styles.cardContainer}>
            <div className={styles.flexBox}>
                <div className={styles.topCourse}>
                    <div style={{ width: "1000px", height: '245px' }}>
                        <Carousel autoplay>
                            <div> <img className={styles.courseImg} src={img_4} alt="" /></div>
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
                            <Button className={styles.annouTop} type="default" size="small" ghost>综合公告</Button>
                            <Button className={styles.annouTop} type="default" size="small" ghost>游戏说明</Button>
                            <Button className={styles.annouTop} type="default" size="small" ghost>活动</Button>
                            <Button className={styles.annouTop} type="default" size="small" ghost>更新与修复</Button>
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
                    <div className={styles.video}>
                        {/* <embed width="425" height="240" allownetworking="all" allowscriptaccess="always" src="https://staticlive.douyucdn.cn/common/share/play.swf?room_id=3299845" quality="high" bgcolor="#000" wmode="window" allowfullscreen="true" allowFullScreenInteractive="true" type="application/x-shockwave-flash" /> */}
                    </div>
                    <div className={styles.market}>
                        <div className={styles.innerItem} style={{ marginRight: '3px', flex: "1" }}>
                            <img style={{ width: '100%', height: '100%' }} src={hammer} alt="" />
                        </div>
                        <div className={styles.innerItem} style={{ marginRight: '3px', width: "90px", background: 'transparent', fontSize: '14px' }}>
                            <Link to="/"><div className={styles.btn}>帐号注册</div></Link>
                            <Link to="/"><div className={styles.btn}>下载中心</div></Link>
                            <Link to="/"><div className={styles.btn}>赞助我们</div></Link>
                        </div>
                        <div className={styles.innerItem} style={{ width: "125px", paddingLeft: '14px', paddingTop: "5px" }}>
                            <ul>
                                <li>服务器简介：</li>
                                <li>经验：100倍</li>
                                <li>金币：99倍</li>
                                <li>掉宝：99倍</li>
                                <li>正义：99倍</li>
                                <li>负重：99倍</li>
                            </ul>
                        </div>
                    </div>

                    <div className={styles.service}>
                        <div className={styles.worTime}>
                            <ul>
                                <li>客户服务：</li>
                                <li>客服qq：2562186390</li>
                                <li>客服微信：MaskedMonkey</li>
                                <li>客服微信：2562186390@qq.com</li>
                                <li>工作时间：18:30-21.30 每天</li>
                            </ul>
                        </div>
                        <div className={styles.qqLeague}>
                            <ul>
                                <li>&nbsp;</li>
                                <li>qq群（2000）：539891495</li>
                                <li style={{ color: 'red' }}>点击加入qq群</li>
                                <li>官方YY频道：21267952</li>
                                <li style={{ color: 'red' }}>点击进入官方YY</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.rightTop}>
                        <span className={styles.title}>攻城信息表：</span>
                        <ul className={styles.siege}>
                            <li style={{ color: 'red' }}>火山：20:00--22:00  05:07</li>
                            <li>肯特：血盟-爱地球</li>
                            <li>妖堡：沦陷中</li>
                            <li>风木：沦陷中</li>
                            <li>奇岩：沦陷中</li>
                            <li>海音：沦陷中</li>
                            <li>亚丁：沦陷中</li>
                            <li>抵押的要塞：沦陷中</li>
                        </ul>
                    </div>
                    <div className={styles.rightBottom}>
                        <span className={styles.title}>服务器的优化和功能：</span>
                        <ul className={styles.funcs}>
                            <li><a href="#">天气系统</a></li>
                            <li><a href="">网站数据库查询APP</a></li>
                            <li><a href="">网站拍卖行APP</a></li>
                            <li><a href="">帐号注册系统</a></li>
                            <li><a href="">自动数据备份</a></li>
                            <li><a href="">减少垃圾东西的掉落</a></li>
                            <li><a href="">修复了很多常见bug</a></li>
                            <li><a href="">长期稳定</a></li>
                        </ul>
                        <div style={{ textAlign: "right" }}>
                            <Button style={{ border: "none", fontSize: "13px", color: '#b8c6cc' }} type="default" size="small" ghost>more</Button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default connect((state) => ({
    items: state.index.items.slice(0, 9),
    gamerInfo: state.index.gamerInfo,
    className: 'announcement'
}))(Index);

// function mapStateToProps(state) {
//     const { items } = state.index;
//     return {
//         items
//     };
// }

// export default connect(mapStateToProps)(Index);