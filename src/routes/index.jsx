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

const Index = ({ dispatch, items, className }) => {
    return (
        <div className={styles.cardContainer}>
            <div className={styles.flexBox}>
                <div className={styles.float_1}>
                    <div style={{ background: 'transparent', marginBottom: "20px" }}>
                        <Button style={{ border: "none", marginRight: "9px", fontSize: "13px" }} type="default" size="small" ghost>综合公告</Button>
                        <Button style={{ border: "none", marginRight: "9px", fontSize: "13px" }} type="default" size="small" ghost>更新</Button>
                        <Button style={{ border: "none", marginRight: "9px", fontSize: "13px" }} type="default" size="small" ghost>活动</Button>
                        <Button style={{ border: "none", marginRight: "9px", fontSize: "13px" }} type="default" size="small" ghost>免责申明</Button>
                        <Button style={{ border: "none", marginRight: "9px", fontSize: "13px" }} type="default" size="small" ghost>关于我们</Button>
                    </div>
                    <Mytable className={className} items={items} />
                    <div style={{ textAlign: "right" }}>
                        <Link style={{ fontSize: "13px" }} to="/announcementList">more</Link>
                    </div>
                </div>
                <div className={styles.float_2}>
                    <Carousel autoplay>
                        <div> <img src={img_1} alt="" /></div>
                        <div> <img src={img_2} alt="" /></div>
                        <div> <img src={img_3} alt="" /></div>
                    </Carousel>
                </div>
            </div>
            <div className={styles.flexBox} style={{ marginTop: "3px" }}>
                <div className={styles.float_3}>
                    <div className={styles.float_5}>

                    </div>
                    <div className={styles.float_6}>

                    </div>
                    <div className={styles.float_7}>

                    </div>
                </div>
                <div className={styles.float_4}>
                    <span className={styles.title}>服务器的优化和功能：</span>
                    <ul className={styles.funcs}>
                        <li><a href="#">天气系统</a></li>
                        <li><a href="">网站数据库查询APP</a></li>
                        <li><a href="">网站拍卖行APP</a></li>
                        <li><a href="">帐号注册系统</a></li>
                        <li><a href="">自动数据备份</a></li>
                        <li><a href="">减少垃圾东西的掉落</a></li>
                        <li><a href="">核心放穿墙</a></li>
                        <li><a href="">核心放穿人</a></li>
                        <li><a href="">修复了很多常见bug</a></li>
                        <li><a href="">掉率和当年官方一样</a></li>
                        <li><a href="">长期稳定</a></li>
                        <li><a href="">支持简体中文</a></li>
                        <li><a href="">掉率和当年官方一样</a></li>
                    </ul>
                    <div style={{ textAlign: "right" }}>
                        <Button style={{ border: "none", fontSize: "13px" }} type="default" size="small" ghost>more</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect((state) => ({
    items: state.index.items,
    className: 'announcement'
}))(Index);

// function mapStateToProps(state) {
//     const { items } = state.index;
//     return {
//         items
//     };
// }

// export default connect(mapStateToProps)(Index);