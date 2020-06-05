import React from 'react';
import { Modal } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

let CreatedOKLodop7766: any = null;
const { warn } = Modal;
const needCLodop = () => {
  try {
    const ua = navigator.userAgent;
    if (ua.match(/Windows\sPhone/i) != null) return true;
    if (ua.match(/iPhone|iPod/i) != null) return true;
    if (ua.match(/Android/i) != null) return true;
    if (ua.match(/Edge\D?\d+/i) != null) return true;

    let verTrident = ua.match(/Trident\D?\d+/i),
      verIE = ua.match(/MSIE\D?\d+/i),
      verOPR: any = ua.match(/OPR\D?\d+/i),
      verFF: any = ua.match(/Firefox\D?\d+/i),
      x64 = ua.match(/x64/i);
    if (verTrident == null && verIE == null && x64 !== null) return true;
    else if (verFF !== null) {
      verFF = verFF[0].match(/\d+/);
      if (verFF[0] >= 42 || x64 !== null) return true;
    } else if (verOPR !== null) {
      verOPR = verOPR[0].match(/\d+/);
      if (verOPR[0] >= 32) return true;
    } else if (verTrident == null && verIE == null) {
      let verChrome: any = ua.match(/Chrome\D?\d+/i);
      if (verChrome !== null) {
        verChrome = verChrome[0].match(/\d+/);
        if (verChrome[0] >= 42) return true;
      }
    }
    return false;
  } catch (err) {
    return true;
  }
};

export const initCLodop = () => {
  if (needCLodop()) {
    const head =
      document.head ||
      document.getElementsByTagName('head')[0] ||
      document.documentElement;
    let oscript = document.createElement('script');
    oscript.src = 'http://localhost:8000/CLodopfuncs.js?priority=1';
    head.insertBefore(oscript, head.firstChild);
    // 引用双端口(8000和18000）避免其中某个被占用
    oscript = document.createElement('script');
    oscript.src = 'http://localhost:18000/CLodopfuncs.js?priority=0';
    head.insertBefore(oscript, head.firstChild);
  }
};

const strHtmInstall = {
  title: '打印控件未安装',
  content: (
    <div>
      点击这里
      <a href="/lodop/install_lodop32.exe" target="_self">
        执行安装
      </a>
      ，安装后请刷新页面或重新进入
    </div>
  ),
  okText: '确定',
};
const strHtmUpdate = {
  title: '打印控件需要升级',
  content: (
    <div>
      点击这里
      <a href="/lodop/install_lodop32.exe" target="_self">
        执行升级
      </a>
      升级后请重新进入
    </div>
  ),
  okText: '确定',
};
const strHtm64_Install = {
  title: '打印控件未安装',
  content: (
    <div>
      点击这里
      <a href="/lodop/install_lodop64.exe" target="_self">
        执行安装
      </a>
      ，安装后请刷新页面或重新进入
    </div>
  ),
  okText: '确定',
};
const strHtm64_Update = {
  title: '打印控件需要升级',
  content: (
    <div>
      点击这里
      <a href="/lodop/install_lodop64.exe" target="_self">
        执行升级
      </a>
      升级后请重新进入
    </div>
  ),
  okText: '确定',
};
const strHtmChrome = {
  title: '系统提示',
  content: '如果此前正常，仅因浏览器升级或重安装而出问题，需重新执行以上安装',
  okText: '确定',
};
const strHtmFireFox = {
  title: '系统提示',
  content:
    '如曾安装过Lodop旧版附件npActiveXPLugin,请在【工具】->【附加组件】->【扩展】中先卸它',
  okText: '确定',
};
const strCLodopInstall = {
  title: 'CLodop云打印服务未安装启动',
  content: (
    <div>
      点击这里
      <a href="/lodop/CLodop_Setup_for_Win32NT.exe" target="_self">
        <DownloadOutlined />
        执行安装
      </a>
      安装后请刷新页面
    </div>
  ),
  okText: '确定',
};
const strCLodopUpdate = {
  title: 'CLodop云打印服务需升级',
  content: (
    <div>
      点击这里
      <a href="/lodop/CLodop_Setup_for_Win32NT.exe" target="_self">
        执行升级
      </a>
      升级后请刷新页面
    </div>
  ),
  okText: '确定',
};
export const getLodop = (oOBJECT?: HTMLElement, oEMBED?: HTMLElement): any => {
  let LODOP;
  try {
    const isIE =
      navigator.userAgent.indexOf('MSIE') >= 0 ||
      navigator.userAgent.indexOf('Trident') >= 0;
    const is64IE = isIE && navigator.userAgent.indexOf('x64') >= 0;
    if (needCLodop()) {
      try {
        LODOP = getCLodop();
      } catch {}
      if (!LODOP && document.readyState !== 'complete') {
        warn({
          title: '系统提示',
          content: '打印控件没准备好，请稍后再试！',
          okText: '确定',
        });
        return;
      }
      if (!LODOP) {
        warn(strCLodopInstall);
      } else {
        if (CLODOP?.CVERSION < '2.1.0.2') {
          warn(strCLodopUpdate);
        }
        if (oEMBED && oEMBED.parentNode) oEMBED.parentNode.removeChild(oEMBED);
        if (oOBJECT && oOBJECT.parentNode)
          oOBJECT.parentNode.removeChild(oOBJECT);
      }
    } else {
      if (oOBJECT != undefined || oEMBED != undefined) {
        if (isIE) LODOP = oOBJECT;
        else LODOP = oEMBED;
      } else if (CreatedOKLodop7766 == null) {
        LODOP = document.createElement('object');
        LODOP.setAttribute('width', '0');
        LODOP.setAttribute('height', '0');
        LODOP.setAttribute(
          'style',
          'position:absolute;left:0px;top:-100px;width:0px;height:0px;',
        );
        if (isIE)
          LODOP.setAttribute(
            'classid',
            'clsid:2105C259-1E0C-4534-8141-A753534CB4CA',
          );
        else LODOP.setAttribute('type', 'application/x-print-lodop');
        document.documentElement.appendChild(LODOP);
        CreatedOKLodop7766 = LODOP;
      } else {
        LODOP = CreatedOKLodop7766;
        if (LODOP == null || typeof LODOP?.VERSION == 'undefined') {
          if (navigator.userAgent.indexOf('Chrome') >= 0) warn(strHtmChrome);
          if (navigator.userAgent.indexOf('Firefox') >= 0) warn(strHtmFireFox);
          if (is64IE) warn(strHtm64_Install);
          else if (isIE) warn(strHtmInstall);
          else warn(strHtmInstall);
          return LODOP;
        }
      }
    }
    if (LODOP?.VERSION < '6.2.1.7') {
      if (needCLodop()) warn(strCLodopUpdate);
      else if (is64IE) warn(strHtm64_Update);
      else if (isIE) warn(strHtmUpdate);
      else warn(strHtmUpdate);
      return LODOP;
    }
    return LODOP;
  } catch (err) {
    console.warn('getLodop出错：' + err);
  }
};
