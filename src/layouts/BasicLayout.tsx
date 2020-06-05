import React, { FunctionComponent, useEffect } from 'react'
import { Layout, Result, ConfigProvider } from 'antd'
import { Header, SlideMenu, NavTab } from '@/components'
import Authorized, { getAuthorityByRoute } from '@/utils/Authorized'
import { Route } from '@/utils/interface'
import { View } from 'cy-element'
import moment from 'moment'
import { useLocation, useDispatch } from 'umi'
import zhCN from 'antd/es/locale/zh_CN'
import 'moment/locale/zh-cn'
import 'nprogress/nprogress.css'
import Style from './layout.less'

moment.locale('en')
interface IProps {
    children: React.ReactElement,
    route: Route
}
const notFound = (<View flex alignItems='middle' justContent='center' height='100%'>
    <Result
        status='404'
        title='404'
        subTitle='您访问的页面不存在，请确保输入正确'
    />
</View>)
const { Content } = Layout
const BasicLayout: FunctionComponent<IProps> = ({ route, children }) => {
    const dispatch = useDispatch()
    const location = useLocation()
    const authRoute = getAuthorityByRoute(route.routes, location.pathname || '/')
    useEffect(() => {
        if (authRoute && authRoute.path !== '/home' && authRoute.path !== '/' && authRoute?.authority)
            dispatch({ type: 'global/addNavTabKey', path: authRoute.path, name: authRoute.name })
    }, [location.pathname])
    return <ConfigProvider locale={zhCN}>
        <Layout className={Style.container}>
            <SlideMenu />
            <Layout>
                <Header />
                <NavTab />
                <Content>
                    <section className={Style.contentWrapper}>
                        <Authorized
                            authority={authRoute?.authority}
                            noMatch={authRoute ? undefined : notFound}>
                            {children}
                        </Authorized>
                    </section>
                </Content>
            </Layout>
        </Layout>
    </ConfigProvider>
}

export default BasicLayout