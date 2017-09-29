import React, { Component } from 'react'
import { connect } from 'dva';
import styles from './AddAnnouncement.less';
// import {LzEditor} from './index' 
// import { Base64 } from "js-base64";
// import md5 from "md5";
import findIndex from "lodash/findIndex";
import uniqBy from "lodash/uniqBy";
import LzEditor from 'react-lz-editor'
import { Select, Button, message, Input } from 'antd';
import { hashHistory } from 'react-router'

const Option = Select.Option
import axios from "axios";
import qs from 'qs';
class AddAnnouncement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      htmlContent: ``,
      responseList: [],
      type: '1',
      inputHtml: "",
      title: ''
    }
    this.receiveHtml = this.receiveHtml.bind(this);
    this.receiveMarkdown = this.receiveMarkdown.bind(this);
    this.receiveRaw = this.receiveRaw.bind(this);
    this.onChange = this.onChange.bind(this);
    this.beforeUpload = this.beforeUpload.bind(this);
    this.getSignature = this.getSignature.bind(this);
    this.getPolicy = this.getPolicy.bind(this);
  }
  receiveHtml(content) {
    console.log("recieved HTML content", content);
    this.setState({ inputHtml: content })
  }
  componentDidMount() {
    if (this.props.location.state && this.props.location.state.id) {
      axios.get('/newlineage/api/getdetail', {
        params: {
          item_id: this.props.location.state.id,
          type: 'web_notice'
        }
      })
        .then((res) => {
          this.setState({
            inputHtml: res.data.data[0].content,
            htmlContent: res.data.data[0].content,
            title: res.data.data[0].item,
            type: res.data.data[0].type,
          })
        })
        .catch((err) => {
          message.warning("请求错误");
        });
    }
  }
  receiveMarkdown(content) {
    console.log("recieved markdown content", content);
  }
  receiveRaw(content) {
    console.log("recieved Raw content", content);
  }
  onChange(info) {
    let currFileList = info.fileList;
    currFileList = currFileList.filter((f) => (!f.length));
    let url = "http://devopee.b0.upaiyun.com";

    //Read remote address and display.
    //读取远程路径并显示链接
    currFileList = currFileList.map((file) => {
      if (file.response) {
        // concat url
        // 组件会将 file.url 作为链接进行展示
        file.url = url + file.response.url;
      }
      if (!file.length) {
        return file;
      }
    });
    let _this = this;

    // filtering successed files
    //按照服务器返回信息筛选成功上传的文件
    currFileList = currFileList.filter((file) => {
      //multiple uploading?
      //根据多选选项更新添加内容
      let hasNoExistCurrFileInUploadedList = !~findIndex(_this.state.responseList, item => item.name === file.name)
      if (hasNoExistCurrFileInUploadedList) {
        if (!!_this.props.isMultiple == true) {
          _this.state.responseList.push(file);
        } else {
          _this.state.responseList = [file];
        }
      }
      return !!file.response || (!!file.url && file.status == "done") || file.status == "uploading";
    });
    currFileList = uniqBy(currFileList, "name");
    if (!!currFileList && currFileList.length != 0) {
      this.setState({ responseList: currFileList });
    }
    _this.forceUpdate();
  }
  beforeUpload(file) {
    console.log("beforeUpload like", file);
  }
  getSignature(fileName) {
    let now = new Date();
    // let h = hmacsha1('19931944122b23f77681b6ab765648f8', 'POST&/upyun-temp/' + fileName + '&' + now);
    // let Signature = Base64.encode(h);
    return Signature;
  }
  getPolicy(fileName) {
    let now = new Date();
    let afterHour = new Date(now.getTime() + 1 * 60 * 60 * 1000); //expiration date time
    let policy = Base64.encode(JSON.stringify({
      "bucket": "devopee",
      "save-key": "/" + fileName,
      "expiration": Math.round(afterHour.getTime() / 1000),
      "date": now
    }));
    return policy;
  }
  handleChange(e) {
    this.setState({ type: e })
  }
  publish() {

    if (!this.state.title) {
      message.warning('请输入标题', 2)
      return
    }
    if (!this.state.inputHtml) {
      message.warning('请输入公告内容', 2)
      return
    }

    if (this.props.location.state && this.props.location.state.id) {
      axios.post('/newlineage/api/noticemanger', qs.stringify({

        content: this.state.inputHtml,
        type: this.state.type,
        item: this.state.title,
        item_id: this.props.location.state.id,
        action: 1
      }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        })
        .then((res) => {
          // let data = res.data

          // 发布成功跳到列表
          message.success('操作成功')
          hashHistory.push('/AnnouncementList')

        })
        .catch((err) => {
          message.warning("请求错误");
        });

    } else {
      axios.post('/newlineage/api/announceArticle', qs.stringify({
        content: this.state.inputHtml,
        type: this.state.type,
        item: this.state.title
      }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        })
        .then((res) => {
          let data = res.data
          if (data.errcode == 200) {
            // 发布成功跳到列表
            message.success('操作成功')
            hashHistory.push('/AnnouncementList')
          }
        })
        .catch((err) => {
          message.warning("请求错误");
        });
    }


  }
  inputTitle(e) {
    this.setState({
      title: e.target.value
    })
  }
  render() {
    let policy = "";

    //uploadProps configration: https://ant.design/components/upload/
    //uploadProps 配置方法见 https://ant.design/components/upload-cn/
    const uploadProps = {
      action: "http://v0.api.upyun.com/devopee",
      onChange: this.onChange,
      listType: 'picture',
      fileList: this.state.responseList,
      data: (file) => {
        // customize uploading parameters, code example use UPYUN(https://www.upyun.com/)
        //自定义上传参数，这里使用UPYUN
        return {
          Authorization: "UPYUN reactlzeditor:" + this.getSignature(file.name),
          policy: (() => {
            policy = this.getPolicy(file.name);
            return policy;
          })(),
          // signature: md5(policy + '&pLv/J4I6vfpeznxtwU+g/dsUcEY=')
        }
      },
      multiple: true,
      beforeUpload: this.beforeUpload,
      showUploadList: true
    }
    let watermarkImage = [
      {
        type: "white_small",
        tip: "white small",
        value: "http://7xjl1j.com1.z0.glb.clouddn.com/white_small.png",
        valuebase64: "aHR0cDovLzd4amwxai5jb20xLnowLmdsYi5jbG91ZGRuLmNvbS93aGl0ZV9zbWFsbC5wbmc="
      }, {
        type: "white_big",
        tip: "white big",
        value: "http://7xjl1j.com1.z0.glb.clouddn.com/white_big.png",
        valuebase64: "aHR0cDovLzd4amwxai5jb20xLnowLmdsYi5jbG91ZGRuLmNvbS93aGl0ZV9iaWcucG5n"
      }
    ]
    return (
      <div className={styles.normal}>
        <div className={styles.top}>
          <label htmlFor="">公告分类：</label>
          <Select defaultValue="2" style={{ width: 120 }} onChange={this.handleChange.bind(this)}> 
            <Option value="2">游戏说明</Option>
            <Option value="3">活动</Option>
            <Option value="4">更新与修复</Option>
          </Select>
          <label htmlFor="">公告标题：</label>
          <Input value={this.state.title} onChange={this.inputTitle.bind(this)} placeholder={'请输入标题'} style={{ width: '200px' }} />
        </div>
        <LzEditor
          active={true}
          importContent={this.state.htmlContent}
          cbReceiver={this.receiveHtml}
          uploadProps={uploadProps} />
        <Button type="primary" style={{ marginTop: "20px" }} onClick={this.publish.bind(this)}>提交</Button>
      </div>
    );
  }
}
export default AddAnnouncement