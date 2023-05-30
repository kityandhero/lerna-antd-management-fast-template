import { connect } from 'easy-soft-dva';
import { getCurrentOperatorCache, getValueByKey } from 'easy-soft-utility';

import { listViewConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataMultiPageView,
  getCurrentOperator,
} from 'antd-management-fast-framework';

import { accessWayCollection } from '../../customConfig';

import { PageHeaderContent } from './PageHeaderContent';
import ShortcutPanel from './ShortcutPanel';

const { MultiPage } = DataMultiPageView;

@connect(({ simple, user, currentOperator, schedulingControl }) => ({
  simple,
  user,
  currentOperator,
  schedulingControl,
}))
class Index extends MultiPage {
  componentAuthority = accessWayCollection.simple.pageList.permission;

  resetDataAfterLoad = false;

  showSearchForm = false;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '工作台',
      listTitle: '新近列表',
      loadApiPath: 'simple/pageList',
      tableScrollX: 1020,
      pageSize: 8,
      currentOperator: null,
    };
  }

  doWorkAdjustDidMount = () => {
    const that = this;

    getCurrentOperator({
      successCallback: (data) => {
        that.setState({ currentOperator: data });
      },
    });
  };

  goToAdd = () => {
    this.goToPath(`/simple/addBasicInfo`);
  };

  goToEdit = (record) => {
    const { simpleId } = record;

    this.goToPath(`/simple/edit/load/${simpleId}/key/basicInfo`);
  };

  establishPageHeaderTitlePrefix = () => {
    return '标题';
  };

  establishPageHeaderSubTitle = () => {
    return '在这里可以快速开展任务作业';
  };

  establishPageContentLayoutSiderConfig = () => {
    return {
      position: 'right',
    };
  };

  establishDataContainerExtraActionCollectionConfig = () => {
    return [
      {
        buildType:
          listViewConfig.dataContainerExtraActionBuildType.generalButton,
        type: 'primary',
        icon: iconBuilder.plus(),
        text: '新增',
        handleClick: this.goToAdd,
      },
    ];
  };

  establishListItemDropdownConfig = (record) => {
    return {
      size: 'small',
      text: '编辑',
      placement: 'topRight',
      icon: iconBuilder.form(),
      handleButtonClick: ({ handleData }) => {
        this.goToEdit(handleData);
      },
      handleData: record,
    };
  };

  getColumnWrapper = () => [];

  establishPageHeaderContentComponentConfig = () => {
    const currentOperator = getCurrentOperatorCache();

    const avatar = getValueByKey({
      data: currentOperator,
      key: 'avatar',
    });

    const name = getValueByKey({
      data: currentOperator,
      key: 'name',
      defaultValue: '--',
    });

    return {
      component: <PageHeaderContent avatar={avatar} name={name} />,
    };
  };

  establishSiderTopAreaConfig = () => {
    return (
      <>
        <ShortcutPanel />
      </>
    );
  };
}

export default Index;
