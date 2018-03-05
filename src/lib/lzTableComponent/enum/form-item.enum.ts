/*
  author:wujie
  name:字段数据类型 和设置类型
  date:2017-9-1
*/
export enum FormItemStructEM {
    Bit = 9,
    Date = 4,
    Float = 2,
    Int32 = 3,
    LongBinary = 6,
    LongText = 5,
    Money = 7,
    Text = 1,
    Time = 8,
    Unknown = 0,
    Options = 10
}

export enum FormItemTypeEM {
    AdvDictionary = 8,
    AutoCoding = 2,
    Checkbox = 12,
    CustomizeCoding = 5,
    DirectoryFile = 13,
    IncrementalCoding = 10,
    Input = 0,
    OptionDepartment = 15,
    OptionDictionary = 14,
    OptionResource = 16,//&H10,
    OptionValue = 1,
    RadioGroup = 11,
    Unknown = -1,
    OptionDictionaryAutoComplete = 17,

    Date = 18,
    Time = 19,
    LongText = 20,
    ImageForUrlCol = 21,
    ImageSelect = 22,
    ImgCamera = 23
}

export enum FormItemElementEM {
    Button = 9,
    Checkbox = 12,
    DropDownList = 6,
    DropDownListDict = 19,
    File = 5,
    FileForDirFile = 18,
    FormSelf = 1,
    Image = 4,
    ImageForDirFile = 17,
    ImageForInputform = 15,
    ImageForPageUrl = 13,
    ImageForUrlCol = 16,
    Label = 2,
    Line = 7,
    LinkButton = 10,
    RadioGroup = 11,
    ResTable = 8,
    Textbox = 3,
    TextboxInPrint = 14,
    Unknown = 0
}