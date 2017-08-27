
export const mainProperty = [
    {
        title: 'AC',
        key: 'AC',
        render: (text, record, index) => {
            // 生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引，@return里面可以设置表格行/列合并
            return <span>AC</span>
        }

    },
    {
        title: 'AC',
        key: 'ACtext',
        dataIndex: "ac"
    },
    {
        title: 'safe',
        key: 'safe',
        render: (text, record, index) => {
            // 生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引，@return里面可以设置表格行/列合并
            return <span>safe</span>
        }

    },
    {
        title: 'safe',
        key: 'safetext',
        dataIndex: "safe"
    },
    {
        title: 'type',
        key: 'type',
        render: (text, record, index) => {
            // 生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引，@return里面可以设置表格行/列合并
            return <span>type</span>
        }

    },
    {
        title: 'type',
        key: 'typetext',
        dataIndex: "type"
    }
];
