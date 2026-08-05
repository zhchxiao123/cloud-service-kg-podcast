# 云服务本体命名约定

> 版本：v0.1  
> 目标：让 Protégé、Turtle、查询和代码中的名称稳定一致。

## IRI 与前缀

- 本体 IRI：`https://example.org/cloud-service-kg`
- 实体命名空间：`https://example.org/cloud-service-kg#`
- 推荐前缀：`cskg:`
- IRI 是稳定标识；界面显示名称来自 `rdfs:label`，不能用显示标签代替 IRI。

## 实体命名

| 元素 | 规则 | 示例 |
|---|---|---|
| 类 | 英文单数名词，UpperCamelCase | `CloudService`、`Region` |
| 对象属性 | 英文动词短语，lowerCamelCase | `hasProvider`、`canMigrateTo` |
| 数据属性 | 英文属性短语，lowerCamelCase，并在需要时带单位 | `hasGPU`、`monthlyPriceUsd` |
| 注释属性 | 英文说明性短语，lowerCamelCase | `dataSource`、`lastUpdated` |
| 个体 | 可识别产品或代码，单词间使用下划线 | `AWS_EC2`、`Azure_VM` |

## 标签与定义

- 核心实体必须同时提供英文和中文 `rdfs:label`。
- 核心类和属性必须提供英文和中文 `rdfs:comment` 定义。
- 标签用于展示，定义用于说明边界；二者都不能改变实体的 IRI。
- 外部事实尽量用 `dataSource` 和 `lastUpdated` 记录证据及核验时间。

## 建模边界

- 类名不用复数形式，避免把类名当成数据库表名。
- 对象属性连接个体与个体；数据属性连接个体与字面量。
- 注释属性用于标签、定义、来源和维护信息，不承担业务推理。
- Domain 和 Range 用来表达可推理的类型关系，不作为数据录入校验规则。
- v0.1 不引入复杂 OWL 限制；只有新的 CQ 明确需要时才扩展。

