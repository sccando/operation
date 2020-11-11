export class BaseSelection{
  constructor(
    public value: number | string,
    public display: string,
    public color?: string
  ){}
}

export class IndexDetail{
  constructor(
    public title: string,
    public dataIndex: string,
    public key: string,
    public ellipsis: boolean
  ){}
}
