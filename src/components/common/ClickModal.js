/** Created by Min on 2017/5/26.  */
import React from 'react';
import PropsType from 'prop-types';
import { Modal } from 'antd';

export default class ClickModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      loading: false,
    };
  }

  handleCancel = () => {
    this.setState({ visible: false, loading: false });
  };

  handleOk = () => {
    if (this.props.onOk) {
      const result = this.props.onOk();
      if (result) {
        this.handleCancel();
      }
    }
  };

  render() {
    return (
      <span>
        <span
          onClick={(e) => {
            e.stopPropagation();
            this.setState({ visible: true });
          }}
        >
          {this.props.content}
        </span>
        <Modal
          visible={this.state.visible}
          confirmLoading={this.state.loading}
          title={this.props.title}
          onOk={this.handleOk}
          onCancel={this.props.onCancel || this.handleCancel}
          maskClosable={this.props.maskClosable || true}
        >
          {this.props.children}
        </Modal>
      </span>
    );
  }

}

ClickModal.PropsType = {
  content: PropsType.object,
  children: PropsType.object,
  onOk: PropsType.func,
  onCancel: PropsType.func,
  title: PropsType.string,
  maskClosable: PropsType.boolean,
};
