AI-paint-tool/
│
├── README.md                    # 项目介绍（核心）
├── LICENSE                      # MIT 开源协议
├── CONTRIBUTING.md              # 贡献指南
├── CODE_OF_CONDUCT.md           # 社区规范
├── CHANGELOG.md                 # 更新日志
├── ROADMAP.md                   # 开发路线图
├── requirements.txt             # Python依赖
├── .gitignore
├── .env.example                 # API配置示例
│
├── app.py                       # 主入口
│
├── config/
│   ├── __init__.py
│   └── settings.py              # 项目配置
│
├── core/
│   ├── __init__.py
│   ├── ai_engine.py             # AI核心调用
│   ├── prompt.py                # Prompt管理
│   └── image_processor.py       # 图像处理
│
├── modules/
│   ├── __init__.py
│   │
│   ├── generation/
│   │   ├── __init__.py
│   │   └── generator.py         # AI生成图片
│   │
│   ├── style_transfer/
│   │   ├── __init__.py
│   │   └── transfer.py          # 风格转换
│   │
│   ├── enhancement/
│   │   ├── __init__.py
│   │   └── enhancer.py          # 图片增强
│   │
│   └── editing/
│       ├── __init__.py
│       └── editor.py            # 图片编辑
│
├── interface/
│   ├── __init__.py
│   └── gradio_ui.py             # Web界面
│
├── utils/
│   ├── __init__.py
│   ├── file_manager.py          # 文件管理
│   └── logger.py                # 日志
│
├── assets/
│   ├── logo.png
│   ├── demo.png
│   └── examples/
│
├── uploads/
│   └── .gitkeep                 # 用户上传图片
│
├── outputs/
│   └── .gitkeep                 # 生成结果
│
├── tests/
│   ├── __init__.py
│   ├── test_generator.py
│   └── test_processor.py
│
├── docs/
│   ├── architecture.md          # 架构说明
│   └── api.md                   # API说明
│
└── .github/
    │
    ├── workflows/
    │   └── test.yml             # 自动测试
    │
    ├── ISSUE_TEMPLATE/
    │   └── bug_report.md
    │
    └── pull_request_template.md