import React, { useEffect, useState, FunctionComponent } from 'react'
import { Tabs } from 'antd'
import Style from './index.less'
import { IconFont } from '@/components'
import { NavTabsType } from '@/utils/interface'
import pathToRegexp from 'path-to-regexp'
import { history, useStore, useDispatch } from 'umi'

const { TabPane } = Tabs
const NavTab: FunctionComponent = () => {
    const { global } = useStore().getState()
    const navTabs: NavTabsType[] = global.navTabs
    const dispatch = useDispatch()
    const [tabKey, setTabKey] = useState('')
    useEffect(() => {
        setTabKey(getCurrentKeyByPathname())
    }, [location.pathname, navTabs])
    const getCurrentKeyByPathname = (): string => {
        const tab = navTabs.find(item => pathToRegexp(location.pathname).exec(item.path))
        if (tab) return tab.path
        return 'NULL'
    }
    const navTabChange = (key: string) => {
        const currentTab = navTabs.find(item => item.path === key)
        if (currentTab && currentTab.path) history?.push(currentTab.path)
        setTabKey(key)
    }
    const handleEdit = (targetKey: string | React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>,
        action: 'add' | 'remove') => {
        if (action === 'remove') {
            dispatch({ type: 'global/delNavTabKey', path: targetKey })
            const index = navTabs.findIndex(item => item.path === targetKey)
            const prevTab = navTabs.find((_, idx) => index - 1 === idx)
            const nextTab = navTabs.find((_, idx) => idx === index + 1)
            if (nextTab) return history?.push(nextTab.path)
            history?.push(prevTab!.path)
        }
    }
    return <section className={Style.container}>
        <Tabs type='editable-card'
            activeKey={tabKey}
            hideAdd={false}
            onEdit={handleEdit}
            onChange={navTabChange}>
            {navTabs.map((item, index: number) => (
                <TabPane
                    tab={item.name}
                    key={item.path}
                    forceRender
                    closeIcon={<IconFont type='icon-close' />}/>
            ))}</Tabs>
    </section>
}
export default NavTab