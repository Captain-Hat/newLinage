import React, { Component } from 'react'
import { connect } from 'dva';
import styles from './AddAnnouncement.less';
// import {LzEditor} from './index' 
// import { Base64 } from "js-base64";
// import md5 from "md5";
import findIndex from "lodash/findIndex";
import uniqBy from "lodash/uniqBy";
import LzEditor from 'react-lz-editor'
import { Select, Button } from 'antd';
const Option = Select.Option

class AddAnnouncement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      htmlContent: `<h1> Head level 1</h1>
                <p style='text-align:center;'><span style="color:#ED5565">red text</span>,center ,<strong>bold</strong>，<em>italic</em></p>
                <blockquote style='text-align:left;'><span style="color:#967adc">C</span> <span style="color:#a0d468">O</span><span style="color:#48cfad">L</span><span style="color:#4a89dc">O</span><span style="color:#967adc">R</span><span style="color:#434a54">S</span></blockquote>
                <p><br></p>
                <ul>
                  <li><span style="color:#434a54">list 1</span></li>
                  <li><span style="color:#434a54">list 2</span></li>
                  <li><span style="color:#434a54">list 3</span></li>
                </ul>
                <pre><code>Block here.Block here.Block here.Block here.</code></pre>
                <pre><code>Block here.Block here.Block here.Block here.Block here.</code></pre>
                <pre><code>Block here.Block here.Block here.Block here.Block here.</code></pre>
                <p><img src="https://image.qiluyidian.mobi/43053508139910678747.jpg"/></p>
                <p><br></p>
                <h2>Yankees, Peeking at the Red Sox, Will Soon Get an Eyeful</h2>
                <p>Leaning over the railing from his perch on the top step of the first-base dugout this past weekend in Cleveland, Yankees Manager Joe Girardi did not have to divert his gaze to catch glimpses of the out-of-town scoreboard./p>
                <p>It was all there on the left-field wall.</p>
                <p>“You’re going to look — it’s impossible not to,” Girardi said. “I haven’t seen a ballpark where they put it behind you. You pay attention, of course.”</p>
                <p>Whenever Girardi stole a glance, there was rarely any good news for the Yankees. While Girardi’s charges were clawing their way to a split of their four-game series against the formidable Indians, the Boston Red Sox were plowing past the rebuilding Chicago White Sox, sweeping four games at Fenway Park.</p>`,
      responseList: []
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
  }
  componentDidMount() { }
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
  handleChange() {

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
          <Select defaultValue="1" style={{ width: 120 }} onChange={this.handleChange}>
            <Option value="1">bug修复</Option>
            <Option value="2">节日活动</Option>
            <Option value="3">更新预告</Option>
          </Select>
        </div>
        <LzEditor
          active={true}
          importContent={this.state.htmlContent}
          cbReceiver={this.receiveHtml}
          uploadProps={uploadProps} />
        <Button type="primary" style={{ marginTop: "20px" }}>确认发布</Button>
      </div>
    );
  }
}
export default AddAnnouncement