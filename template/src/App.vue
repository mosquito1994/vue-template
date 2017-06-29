<template>
    <div id="app">
        <div class="layout">
            <Row class="layout-main" v-if="authorityData.length != 0">
                <i-col :span="spanLeft" v-if="spanLeft" class="layout-menu-left">
                    <Menu :active-name="activeName" theme="dark" width="auto" :open-names="[_data._name]">
                        <div class="layout-logo-left">MAY</div>
                        <template v-for="(item, indexParent) in authorityData">
                            <Submenu v-if="item.url.split('/')[1] == _data._name" :key="item.url.split('/')[1]" :name="item.url.split('/')[1]">
                                <template slot="title">
                                    <Icon v-if="indexParent == 1" type="crop"></Icon>
                                    <Icon v-else type="ios-navigate"></Icon>
                                   {{ item.title }}
                                </template>
                                <router-link  v-for="(item1, index) in item.children" :key="item1.url" :to="item1.url">
                                    <Menu-item @click.native="reload(item.url.split('/')[1] + '/' + item1.url.split('/')[2])" :name="item.url.split('/')[1] + '-' + item1.url.split('/')[2]">{{index+1}}、{{item1.title}}</Menu-item>
                                </router-link>
                            </Submenu>
                            <a v-if="item.url.split('/')[1] != _data._name" v-on:click="navToChild(item)" :key="item.url.split('/')[1]">
                                <Submenu :name="indexParent">
                                    <template slot="title">
                                        <Icon v-if="indexParent == 1" type="crop"></Icon>
                                        <Icon v-else type="ios-navigate"></Icon>
                                        {{item.title}}
                                    </template>
                                </Submenu>
                            </a>
                        </template>
                    </Menu>
                </i-col>
                <i-col :span="spanRight" class="layout-menu-right">
                    <div class="layout-menu-arrow" @click="toggleNav">
                        <Icon type="chevron-left" class="u-icon" v-if="spanLeft"></Icon>
                        <Icon type="chevron-right" class="u-icon" v-else></Icon>
                    </div>
                    <div class="layout-ceiling">
                        <div class="layout-ceiling-main">
                            <span>{{nickName}}</span> |
                            <a href="/login/logout.do">退出登录</a> |
                        </div>
                    </div>
                    <div class="layout-scroll">
                        <div class="layout-content">
                            <router-view></router-view>
                        </div>
                    </div>
                    <div class="layout-copy">
                        2011-2017 &copy; Netease May
                    </div>
                </i-col>
            </Row>
        </div>
    </div>
</template>
<script>
    import { loadModule } from './env'

    export default {
        mixins: [loadModule],
        data () {
            return {
                _name: "<%= name %>",
                spanLeft: 4,
                spanRight: 20,
                nickName: '',
                activeName: "",
                authorityData: []
            }
        },
        created () {
            if (this.$parent.authorityData) {
              this.handleAuthority(this.$parent.authorityData);

              return;
            }
            this.getAuthority();
        },
        methods: {
            toggleNav () {
                if (this.spanLeft === 4) {
                    this.spanLeft = 0;
                    this.spanRight = 24;
                } else {
                    this.spanLeft = 4;
                    this.spanRight = 20;
                }
                if (document.createEvent) {
                    var event = document.createEvent('HTMLEvents');
                    event.initEvent('resize', true, true);
                    window.dispatchEvent(event);
                } else if (document.createEventObject) {
                    window.fireEvent('onresize');
                }
            },
            getAuthority () {
                let _this = this;

                GetData.getAuthority().done(function(_data) {
                    _this.handleAuthority(_data);
                });
            },
            handleAuthority (_data) {
                var _this = this;
  
                // 菜单渲染根据weight顺序展示
                for (var i = 0; i < _data.result.children.length; i++) {
                    if (_data.result.children[i].children) {
                        _data.result.children[i].children = _data.result.children[i].children.sort(Utils.compare('weight'));
                    }
                }
                _data.result.children = _data.result.children.sort(Utils.compare('weight'));
                _this.authorityData = _data.result.children;
                _this.nickName = _data.result.nickName;
                // 获得active的项和展开的项
                _this.authorityData.forEach(function (item, index) {
                    if (item.children) {
                        item.children.forEach(function (_item, _index) {
                            if (_item.url === location.hash.split("#")[1]) {
                                _this.openName = item.url.split("/")[1];
                                _this.activeName = item.url.split("/")[1] + "-" + _item.url.split("/")[2];
                            }
                        });
                    }
                });
            },
            reload (val) {
                var _hash = window.location.hash;

                if (_hash.indexOf(val) === -1) {
                    return;
                }
                if (window.routeConfig) {
                    var _config = window.routeConfig[val.split("/")[0]],
                        _flag = _config.readyFlag,
                        _fn = _config.globalFn;

                    GetData.getAuthority().done(function(_data) {
                        window[_flag] && window[_fn] && window[_fn](_data);
                    });                    
                } else {
                    location.reload();
                }
            }
        }
    }
</script>
