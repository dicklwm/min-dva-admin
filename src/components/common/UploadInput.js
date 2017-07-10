/** Created by Min on 2017/6/23.  */
import React from 'react';
import { Input, Upload, Icon } from 'antd';


export default class UploadInput extends React.Component {

  state = {
    file: undefined, // 文件源对象
    fileList: [], // 文件队列
  }

  render() {
    const { value, name, action, data, style, onChange } = this.props;
    return (
      <Upload
        style={style}
        name={name}
        action={action}
        data={data}
        beforeUpload={(curFile, curFileList) => {
                // 将上传的东西存到state里，返回false阻止上传
          this.setState({
            file: curFile,
            fileList: curFileList,
          });
          if (onChange) {
            onChange(curFile.name, curFile);
          }
          return false;
        }}
      >
        <Input
          size="large"
          className="large-check-input"
          value={value}
          style={style}
          readOnly
          suffix={
            <span>
              <Icon type="upload" />
                      上传文件
                    </span>
                }
        />
      </Upload>
    );
  }

}
