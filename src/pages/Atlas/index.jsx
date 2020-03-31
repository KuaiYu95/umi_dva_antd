import React from 'react';
import { Map, Markers } from 'react-amap';
import BlockLoading from '@/components/BlockLoading/index';
import { Icon, Tag, Button, Input, notification } from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import styles from './index.less';

const { TextArea } = Input
class Atlas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      longitude: '120.060141',
      latitude: '30.285995',
      location: '西溪花园 · 芦雪苑',
      title: <Icon type='home' />,
      addMap: false,
      isCollect: true,
      center: {
        longitude: 120.059063,
        latitude: 30.285201
      },
      useCluster: false,
      markers: [{
        position: {
          longitude: '120.060141',
          latitude: '30.285995',
        },
        location: '西溪花园 · 芦雪苑',
        title: <Icon type='home' />,
        myLabel: <img style={{ width: 32, height: 32 }} src="https://front-images.oss-cn-hangzhou.aliyuncs.com/i4/a8d30d2a06eeb0d7bb43b0f8275c43ae-48-48.png" alt="" />,
        time: moment().format('YYYY-MM-DD')
      }]
    }
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'atlas/queryGetAtlas',
      payload: {}
    }).then(() => {
      const { markers } = this.state
      const data = this.props.atlasMarkers.data.map(it => {
        const myLabel = <img style={{ width: 32, height: 32 }} src="https://front-images.oss-cn-hangzhou.aliyuncs.com/i4/a8d30d2a06eeb0d7bb43b0f8275c43ae-48-48.png" alt="" />
        return { ...it, myLabel }
      })
      this.setState({
        markers: markers.concat(data)
      })
    })
  }

  addFootPrint() {
    const { longitude, latitude, location, title, markers } = this.state
    const time = new Date().getTime()
    const position = { longitude, latitude }
    const myLabel = <img style={{ width: 32, height: 32 }} src="https://front-images.oss-cn-hangzhou.aliyuncs.com/i4/a8d30d2a06eeb0d7bb43b0f8275c43ae-48-48.png" alt="" />
    const marker = { position, location, title, time }
    if (longitude && latitude && location && title) {
      this.props.dispatch({
        type: 'atlas/queryAddAtlas',
        payload: { ...marker }
      }).then(() => {
        const { success, data } = this.props.atlasMarker
        this.setState({
          addMap: false,
          markers: [...markers, { ...data, myLabel }],
          center: { longitude, latitude },
          isCollect: true,
        })
        this.openNotification(success)
      })
    } else {
      notification['error']({
        message: '操作提示',
        description: '添加失败，有未填写字段',
        duration: 2
      })
    }
  }

  openNotification(success) {
    success ? notification['success']({
      message: '操作提示',
      description: '添加成功',
      duration: 2
    }) : notification['error']({
      message: '操作提示',
      description: '添加失败，请检查网络',
      duration: 2
    })
  };

  events = {
    created: mapInstance => {
      this.setState({ zoom: mapInstance.getZoom() })
    },
    click: e => {
      this.setState({
        latitude: e.lnglat.lat,
        longitude: e.lnglat.lng,
        isCollect: false,
      })
    },
  }

  markerEvents = {
    click: (e, marker) => {
      const extData = marker.getExtData()
      const { location, position, time, title } = extData;
      this.setState({
        latitude: position.latitude,
        longitude: position.longitude,
        location, title,
        time: time ? moment(time).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
        isCollect: true,
        addMap: false
      })
    },
  }

  renderMarkerLayout(extData) {
    return <div>{extData.myLabel}</div>
  }

  addMap() {
    this.setState({
      addMap: true,
      title: '',
      location: '',
    })
  }

  save(e, type) {
    type === 'location' && this.setState({ location: e.target.value })
    type === 'title' && this.setState({ title: e.target.value })
  }

  render() {
    const { loading, longitude, latitude, location, isCollect, addMap, title } = this.state
    const plugins = [
      'Scale',
      { name: 'ToolBar' }
    ]
    const card = {
      position: 'absolute',
      top: '10px',
      left: '10px',
      width: 200,
      padding: '15px',
      fontSize: 12,
    }
    return (
      !loading ? <div className={styles.atlas} style={{ padding: '24px 0' }}>
        <div className={styles.map} style={{ width: addMap ? 'calc(100% - 266px)' : '100%' }}>
          <Map amapkey='ec5816ac0b3be06896d10712b1c815c2' plugins={plugins} center={this.state.center} zoom={15} events={this.events} >
            <Markers markers={this.state.markers} useCluster={this.state.useCluster} render={this.renderMarkerLayout} events={this.markerEvents} />
            <div style={card}>
              {isCollect && <>
                <Tag className={styles.tag} color="#000"><Icon type="compass" /> 经度: {longitude}</Tag>
                <Tag className={styles.tag} color="#000"><Icon type="compass" rotate={90} /> 纬度: {latitude}</Tag>
                <Tag className={styles.tag} color="#000"><Icon type="search" /> 时间: {moment().format('YYYY-MM-DD')}</Tag>
                <Tag className={styles.tag} color="#000"><Icon type="environment" /> 地点: {location}</Tag>
                <Tag className='tag wrap' color="#000"><Icon type="menu" /> 描述: {title}</Tag>
              </>}
              {!isCollect && <>
                <Tag className={styles.tag} color="#000"><Icon type="compass" /> 经度: {longitude}</Tag>
                <Tag className={styles.tag} color="#000"><Icon type="compass" rotate={90} /> 纬度: {latitude}</Tag>
                <Tag className={styles.tag} color="#888E9D" onClick={this.addMap.bind(this)}><Icon type="plus-circle" /> 未收藏，去添加收藏</Tag>
              </>}
            </div>
          </Map>
        </div>
        {addMap && <div className={styles.side}>
          <div className={styles.rowInput}>
            <Icon className={styles.icon} type="compass" />
            <Input className={styles.input} type='text' value={longitude} onChange={e => this.save(e, 'longitude')} />
          </div>
          <div className={styles.rowInput}>
            <Icon className={styles.icon} type="compass" rotate={90} />
            <Input className={styles.input} type='text' value={latitude} onChange={e => this.save(e, 'latitude')} />
          </div>
          <div className={styles.rowInput}>
            <Icon className={styles.icon} type="search" />
            <Input className={styles.input} type='text' value={moment().format('YYYY-MM-DD')} onChange={e => this.save(e, 'time')} />
          </div>
          <div className={styles.rowInput}>
            <Icon className={styles.icon} type="environment" />
            <Input className={styles.input} type='text' placeholder='请输入地址' onChange={e => this.save(e, 'location')} />
          </div>
          <div className={styles.rowInput}>
            <Icon className={styles.icon} type="menu" />
            <TextArea allowclear="true" autosize={{ minRows: 3, maxRows: 5 }} placeholder='请输入标题' onChange={e => this.save(e, 'title')} />
          </div>
          <div className={styles.formSubmit}>
            <Button block type='primary' onClick={this.addFootPrint.bind(this)}>添加</Button>
          </div>
        </div>}
      </div> : <BlockLoading loading={loading} />
    )
  }
}

export default connect(({ atlas }) => ({
  atlasMarkers: atlas.atlasMarkers,
  atlasMarker: atlas.atlasMarker
}))(Atlas);