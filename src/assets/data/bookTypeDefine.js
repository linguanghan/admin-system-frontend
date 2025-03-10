export function getBooktypes() {
  const bookTypeOptions = [
    {
      label: "未知",
      value: 0
    },
    {
      label: "一年级上册",
      value: 11
    },
    {
      label: "一年级下册",
      value: 12
    },
    {
      label: "二年级上册",
      value: 21
    },
    {
      label: "二年级下册",
      value: 22
    },
    {
      label: "三年级上册",
      value: 31
    },
    {
      label: "三年级下册",
      value: 32
    },
    {
      label: "四年级上册",
      value: 41
    },
    {
      label: "四年级下册",
      value: 42
    },
    {
      label: "五年级上册",
      value: 51
    },
    {
      label: "五年级下册",
      value: 52
    },
    {
      label: "六年级上册",
      value: 61
    },
    {
      label: "六年级下册",
      value: 62
    },
    {
      label: "七年级上册",
      value: 71
    },
    {
      label: "七年级下册",
      value: 72
    },
    {
      label: "八年级上册",
      value: 81
    },
    {
      label: "八年级下册",
      value: 82
    },
    {
      label: "九年级上册",
      value: 91
    },
    {
      label: "九年级下册",
      value: 92
    },
    {
      label: "高一上册",
      value: 101
    },
    {
      label: "高一下册",
      value: 102
    },
    {
      label: "高二上册",
      value: 111
    },
    {
      label: "高二下册",
      value: 112
    },
    {
      label: "高三上册",
      value: 121
    },
    {
      label: "高三下册",
      value: 122
    },

    {
      label: "大一上册",
      value: 131
    },

    {
      label: "大一下册",
      value: 132
    },

    {
      label: "大二上册",
      value: 141
    },

    {
      label: "大二下册",
      value: 142
    },

    {
      label: "大三上册",
      value: 151
    },

    {
      label: "大三下册",
      value: 152
    },

    {
      label: "大四上册",
      value: 161
    },

    {
      label: "大四下册",
      value: 162
    }
  ]

   var bookTypesMap = new Map();
    for (let index = 0; index < bookTypeOptions.length; index++) {
      const element = bookTypeOptions[index];
      bookTypesMap.set(element.value, element.label);
    }

    return {
      bookTypeOptions : bookTypeOptions,
      bookTypesMap: bookTypesMap
    };

}