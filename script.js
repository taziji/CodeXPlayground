const navTreeEl = document.getElementById('nav-tree');
const sectionTitleEl = document.getElementById('section-title');
const sectionDescriptionEl = document.getElementById('section-description');
const sectionBodyEl = document.getElementById('section-body');
const navSearchEl = document.getElementById('nav-search');
const viewToggleButtons = document.querySelectorAll('.view-toggle__btn');
const newAssetBtn = document.getElementById('new-asset-btn');
const assignBtn = document.getElementById('assign-btn');
const uploadBtn = document.getElementById('upload-btn');

let currentView = null;
let activeWorkspaceSectionId = 'project-overview';
let activeOrgUnitId = null;

const icons = {
  info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`,
  team: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  supplier: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h4"/><polyline points="16 16 21 12 16 8"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
  contract: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 2H6a2 2 0 0 0-2 2v16l4-4h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/><path d="M8 7h6M8 11h4"/></svg>`,
  finance: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 21V9"/><path d="m9 21 9-12 9 12"/><path d="M2 21h6"/><path d="M5 21V3"/></svg>`,
  training: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-5 7-5 7 5-7 5"/><path d="M5 14v7"/><path d="M19 14v7"/><path d="M12 4v4"/></svg>`,
  media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m10 9 5 3-5 3z"/></svg>`,
  tasks: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 21h10"/><path d="M5 3h14a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M9 7h6"/><path d="M9 11h6"/><path d="M9 15h4"/></svg>`,
  org: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5V3a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v2"/><path d="M4 13v-2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2"/><path d="M4 5h8"/><path d="M12 7H4"/><path d="M20 21v-2a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v2"/><path d="M12 13h8"/><path d="M20 15h-8"/></svg>`,
  kpi: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M7 14l4-4 3 3 5-5"/></svg>`,
  alert: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m10.29 3.86-7 12A1 1 0 0 0 4.18 17h15.64a1 1 0 0 0 .89-1.5l-7-12a1 1 0 0 0-1.74 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`
};

const workspaceSections = [
  {
    id: 'project-overview',
    label: '项目信息',
    icon: 'info',
    description: '统一管理项目定位、里程碑、预算动态和风险预警，确保核心信息透明。',
    toolbar: {
      filters: [
        { type: 'select', label: '阶段', options: ['全部阶段', '启动', '规划', '执行', '收尾'] },
        { type: 'select', label: '优先级', options: ['全部优先级', '高', '中', '低'] }
      ],
      actions: [{ label: '导出报告' }]
    },
    assets: [
      {
        title: '项目蓝图与范围说明',
        description: '定义目标、成功指标和关键里程碑，方便新成员快速了解项目。',
        tag: '文档',
        updated: '更新 · 2 天前',
        contributors: ['LC', 'ZR', 'HM']
      },
      {
        title: '预算追踪仪表盘',
        description: '实时对比预算与实际支出，自动标注超支风险与审批进度。',
        tag: '仪表盘',
        updated: '更新 · 5 小时前',
        contributors: ['ZT', 'AR']
      },
      {
        title: '风险登记表',
        description: '列出潜在风险、影响评估与缓解责任人，支持情景提醒。',
        tag: '表格',
        updated: '更新 · 1 周前',
        contributors: ['LC']
      }
    ]
  },
  {
    id: 'project-team',
    label: '项目成员',
    icon: 'team',
    description: '梳理团队组织结构、角色职责与资源安排，支持一键指派。',
    toolbar: {
      filters: [
        { type: 'select', label: '部门', options: ['全部部门', '产品', '技术', '市场', '供应链'] },
        { type: 'input', label: '搜索成员', placeholder: '输入姓名或角色' }
      ],
      actions: [{ label: '同步花名册' }]
    },
    assets: [
      {
        title: '角色职责矩阵',
        description: '清晰标注项目 Sponsor、Owner、Reviewer 与执行人。',
        tag: 'RACI',
        updated: '更新 · 昨天',
        contributors: ['WW', 'HM']
      },
      {
        title: '入组入离场流程',
        description: '规范化成员入项与离项流程，附审批链与知识交接模板。',
        tag: '流程',
        updated: '更新 · 3 天前',
        contributors: ['LC']
      }
    ]
  },
  {
    id: 'supplier',
    label: '供应商选择',
    icon: 'supplier',
    description: '集中比对供应商方案、协议文本与结算明细，提升合作透明度。',
    children: [
      {
        id: 'supplier-vml',
        label: 'VML合作协议',
        icon: 'contract',
        description: '查看与 VML 的合作条款、交付节点与验收标准，支持版本对比。',
        assets: [
          {
            title: 'VML 合作协议 V3.1',
            description: '最新合同文本，包含交付范围调整与 KPI 更新记录。',
            tag: '协议',
            updated: '更新 · 1 小时前',
            contributors: ['AR', 'ZT']
          },
          {
            title: '版本差异比对',
            description: '自动高亮 V2.0 与 V3.1 之间的条款差异与审批记录。',
            tag: '分析',
            updated: '更新 · 3 小时前',
            contributors: ['ZR']
          }
        ]
      },
      {
        id: 'supplier-tripartite',
        label: '供应商三方合作协议',
        icon: 'contract',
        description: '汇总三方责任分工、付款节点和保密条款，支持联合审阅。',
        assets: [
          {
            title: '三方合作协议（草案）',
            description: '草案待定稿，记录来自法务、财务的修订意见。',
            tag: '草案',
            updated: '更新 · 2 天前',
            contributors: ['HM', 'LC']
          },
          {
            title: '审批纪要',
            description: '会议纪要同步签署进度，包含下一步待办。',
            tag: '纪要',
            updated: '更新 · 1 天前',
            contributors: ['WW']
          }
        ]
      },
      {
        id: 'supplier-settlement',
        label: '结算清单材料',
        icon: 'finance',
        description: '自动对接财务系统，跟踪发票、结算单及付款凭证。',
        assets: [
          {
            title: '月度结算清单',
            description: '包含里程碑付款节点、对账状态与核验结果。',
            tag: '报表',
            updated: '更新 · 今天',
            contributors: ['ZT', 'AR', 'LC']
          },
          {
            title: '发票归档列表',
            description: '归档发票扫描件，按供应商与月份自动分类。',
            tag: '台账',
            updated: '更新 · 4 小时前',
            contributors: ['ZR']
          }
        ]
      }
    ]
  },
  {
    id: 'training',
    label: '培训资料选择',
    icon: 'training',
    description: '集中管理各类培训课件、演练脚本与考试题库，支持智能推荐。',
    toolbar: {
      filters: [
        { type: 'select', label: '形式', options: ['全部', '直播', '录播', '文档'] },
        { type: 'select', label: '覆盖角色', options: ['全部角色', '产品', '运营', '销售'] }
      ],
      actions: [{ label: '发布培训计划' }]
    },
    assets: [
      {
        title: '项目入门训练营',
        description: '面向新成员的 90 分钟入门直播课程与讲义。',
        tag: '课程',
        updated: '更新 · 刚刚',
        contributors: ['HM', 'WW']
      },
      {
        title: '需求评审演练脚本',
        description: '模拟评审场景与问答，帮助跨部门对齐关键问题。',
        tag: '脚本',
        updated: '更新 · 6 小时前',
        contributors: ['ZR']
      }
    ]
  },
  {
    id: 'media',
    label: '媒体清单',
    icon: 'media',
    description: '对接传播渠道与素材资产，集中素材审批、上下架记录。',
    toolbar: {
      filters: [
        { type: 'input', label: '关键字', placeholder: '搜索素材名称或标签' },
        { type: 'select', label: '渠道', options: ['全部渠道', '视频', '社媒', '线下'] }
      ],
      actions: [{ label: '生成投放包' }]
    },
    assets: [
      {
        title: '品牌视觉主KV',
        description: '高分辨率主视觉，含 PSD/PNG 多规格下载。',
        tag: '设计',
        updated: '更新 · 8 小时前',
        contributors: ['AR', 'HM']
      },
      {
        title: '发布会花絮视频',
        description: '1 分钟短视频，适用于 B 站/抖音渠道同步。',
        tag: '视频',
        updated: '更新 · 昨天',
        contributors: ['WW']
      }
    ]
  },
  {
    id: 'tasks',
    label: '任务清单',
    icon: 'tasks',
    description: '跟踪跨团队任务进度与依赖，支持甘特视图与燃尽图。',
    toolbar: {
      filters: [
        { type: 'select', label: '状态', options: ['全部状态', '未开始', '进行中', '已完成'] },
        { type: 'select', label: '负责人', options: ['全部成员', 'LC', 'HM', 'AR', 'WW', 'ZR', 'ZT'] }
      ],
      actions: [{ label: '导入任务' }]
    },
    assets: [
      {
        title: '任务燃尽追踪',
        description: '自动生成燃尽曲线，识别潜在延期风险。',
        tag: '报表',
        updated: '更新 · 30 分钟前',
        contributors: ['LC', 'ZR']
      },
      {
        title: '依赖关系图谱',
        description: '可视化任务间依赖与关键路径，一键同步给干系人。',
        tag: '图谱',
        updated: '更新 · 12 小时前',
        contributors: ['HM', 'ZT']
      }
    ]
  }
];

const memberPortal = {
  title: '成员管理门户',
  description: '集中掌握项目分配、成员信息与组织健康度，助力快速响应协作需求。',
  projects: [
    { id: 'project-supply', label: '智慧供应链协同', owner: '刘畅', timeline: 'Q3 里程碑' },
    { id: 'project-insight', label: '商业洞察平台', owner: '王薇', timeline: '双周迭代' },
    { id: 'project-growth', label: '渠道增长实验', owner: '贺曼', timeline: '增长冲刺' },
    { id: 'project-compliance', label: '合规流程优化', owner: '赵涛', timeline: '阶段验收' }
  ],
  members: [
    {
      id: 'member-liu-chang',
      name: '刘畅',
      role: '项目总监',
      email: 'liu.chang@acme.cn',
      department: '战略协同组',
      company: 'GSK Pharma',
      assignedProjects: ['project-supply', 'project-insight'],
      tags: ['产品', '核心成员']
    },
    {
      id: 'member-wang-wei',
      name: '王薇',
      role: '产品负责人',
      email: 'wang.wei@acme.cn',
      department: '商业创新中心',
      company: 'GSK Digital',
      assignedProjects: ['project-insight', 'project-growth'],
      tags: ['产品']
    },
    {
      id: 'member-cheng-hao',
      name: '程浩',
      role: '高级产品经理',
      email: 'cheng.hao@acme.cn',
      department: '体验策略组',
      company: 'GSK Digital',
      assignedProjects: ['project-insight'],
      tags: ['产品', '体验']
    },
    {
      id: 'member-lin-zhou',
      name: '林舟',
      role: '需求分析主管',
      email: 'lin.zhou@acme.cn',
      department: '数据治理组',
      company: 'GSK Digital',
      assignedProjects: ['project-compliance'],
      tags: ['数据', '流程']
    },
    {
      id: 'member-zhao-tao',
      name: '赵涛',
      role: '技术总监',
      email: 'zhao.tao@acme.cn',
      department: '平台工程部',
      company: 'GSK Tech Center',
      assignedProjects: ['project-supply', 'project-compliance'],
      tags: ['技术', '核心成员']
    },
    {
      id: 'member-huang-min',
      name: '黄敏',
      role: '平台研发负责人',
      email: 'huang.min@acme.cn',
      department: '平台工程部',
      company: 'GSK Tech Center',
      assignedProjects: ['project-compliance'],
      tags: ['技术']
    },
    {
      id: 'member-lv-sen',
      name: '吕森',
      role: '交付经理',
      email: 'lv.sen@acme.cn',
      department: '交付保障组',
      company: 'GSK Tech Center',
      assignedProjects: ['project-supply'],
      tags: ['交付']
    },
    {
      id: 'member-he-man',
      name: '贺曼',
      role: '运营负责人',
      email: 'he.man@acme.cn',
      department: '增长策略组',
      company: 'GSK Growth Lab',
      assignedProjects: ['project-growth'],
      tags: ['市场', '核心成员']
    },
    {
      id: 'member-su-yan',
      name: '苏燕',
      role: '增长运营',
      email: 'su.yan@acme.cn',
      department: '渠道运营组',
      company: '外部合作伙伴',
      assignedProjects: ['project-growth'],
      tags: ['市场', '外部协作']
    },
    {
      id: 'member-tang-yu',
      name: '唐瑜',
      role: '数据分析师',
      email: 'tang.yu@acme.cn',
      department: '商业分析组',
      company: 'GSK Analytics',
      assignedProjects: ['project-insight', 'project-growth'],
      tags: ['数据']
    }
  ]
};

const memberFiltersState = {
  search: ''
};

let memberOrgTree = [];

const colorPalette = ['#2563eb', '#db2777', '#16a34a', '#f97316', '#7c3aed', '#0d9488'];

function createAvatar(initials, index) {
  const avatar = document.createElement('span');
  avatar.className = 'avatar';
  avatar.textContent = initials;
  avatar.style.background = `rgba(${hexToRgb(colorPalette[index % colorPalette.length])}, 0.14)`;
  avatar.style.color = colorPalette[index % colorPalette.length];
  return avatar;
}

function hexToRgb(hex) {
  const sanitized = hex.replace('#', '');
  const bigint = parseInt(sanitized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r}, ${g}, ${b}`;
}

function renderToolbar(toolbar) {
  if (!toolbar) return null;
  const toolbarEl = document.createElement('div');
  toolbarEl.className = 'section-toolbar';

  const filtersEl = document.createElement('div');
  filtersEl.className = 'section-toolbar__filters';

  toolbar.filters?.forEach((filter) => {
    if (filter.type === 'select') {
      const select = document.createElement('select');
      filter.options.forEach((option) => {
        const optionEl = document.createElement('option');
        optionEl.value = option;
        optionEl.textContent = option;
        select.appendChild(optionEl);
      });
      filtersEl.appendChild(select);
    } else if (filter.type === 'input') {
      const input = document.createElement('input');
      input.type = 'search';
      input.placeholder = filter.placeholder || '';
      filtersEl.appendChild(input);
    }
  });

  toolbarEl.appendChild(filtersEl);

  const actionsEl = document.createElement('div');
  toolbar.actions?.forEach((action) => {
    const actionBtn = document.createElement('button');
    actionBtn.textContent = action.label;
    actionsEl.appendChild(actionBtn);
  });

  toolbarEl.appendChild(actionsEl);
  return toolbarEl;
}

function renderAssets(assets) {
  const grid = document.createElement('div');
  grid.className = 'asset-grid';
  const template = document.getElementById('asset-card-template');

  assets.forEach((asset) => {
    const card = template.content.firstElementChild.cloneNode(true);
    card.querySelector('.asset-card__tag').textContent = asset.tag;
    card.querySelector('.asset-card__updated').textContent = asset.updated;
    card.querySelector('.asset-card__title').textContent = asset.title;
    card.querySelector('.asset-card__description').textContent = asset.description;

    const avatarsWrapper = card.querySelector('.asset-card__avatars');
    avatarsWrapper.innerHTML = '';
    asset.contributors?.forEach((initials, index) => {
      avatarsWrapper.appendChild(createAvatar(initials, index));
    });

    grid.appendChild(card);
  });

  return grid;
}

function renderWorkspaceSection(section) {
  sectionTitleEl.textContent = section.label;
  sectionDescriptionEl.textContent = section.description;
  sectionBodyEl.innerHTML = '';

  const toolbarEl = renderToolbar(section.toolbar);
  if (toolbarEl) {
    sectionBodyEl.appendChild(toolbarEl);
  }

  if (section.assets && section.assets.length) {
    sectionBodyEl.appendChild(renderAssets(section.assets));
  } else if (section.children) {
    const grid = document.createElement('div');
    grid.className = 'asset-grid';
    section.children.forEach((child) => {
      const card = document.createElement('article');
      card.className = 'asset-card';
      card.innerHTML = `
        <header class="asset-card__header">
          <div class="asset-card__meta">
            <span class="asset-card__tag">子模块</span>
            <span class="asset-card__updated">${child.assets?.length || 0} 个资产</span>
          </div>
          <button class="asset-card__more" aria-label="进入模块">→</button>
        </header>
        <h3 class="asset-card__title">${child.label}</h3>
        <p class="asset-card__description">${child.description}</p>
        <footer class="asset-card__footer">
          <div class="asset-card__avatars"></div>
          <button class="asset-card__cta" data-child="${child.id}">查看资产</button>
        </footer>
      `;
      const avatarsWrapper = card.querySelector('.asset-card__avatars');
      const uniqueContributors = [...new Set(child.assets?.flatMap((asset) => asset.contributors) || [])];
      uniqueContributors.slice(0, 3).forEach((initials, index) => {
        avatarsWrapper.appendChild(createAvatar(initials, index));
      });

      card.querySelector('.asset-card__cta').addEventListener('click', () => {
        const childSection = section.children?.find((item) => item.id === child.id);
        if (childSection) {
          activateWorkspaceSection(childSection.id);
        }
      });

      grid.appendChild(card);
    });
    sectionBodyEl.appendChild(grid);
  } else {
    const placeholder = document.createElement('div');
    placeholder.className = 'placeholder';
    placeholder.innerHTML = `<p>该模块暂无资产，点击“上传资产”快速添加。</p>`;
    sectionBodyEl.appendChild(placeholder);
  }
}

function buildWorkspaceNavItem(section, depth = 0) {
  const node = document.createElement('div');
  node.className = 'tree-node';

  const trigger = document.createElement('div');
  trigger.className = 'tree-item';
  trigger.dataset.sectionId = section.id;
  trigger.style.paddingLeft = `${12 + depth * 18}px`;

  const labelWrapper = document.createElement('div');
  labelWrapper.className = 'tree-item__label';

  const iconWrapper = document.createElement('span');
  iconWrapper.innerHTML = icons[section.icon || 'info'] || '';
  const iconElement = iconWrapper.firstElementChild;
  if (iconElement) {
    labelWrapper.appendChild(iconElement);
  }

  const label = document.createElement('span');
  label.textContent = section.label;
  labelWrapper.appendChild(label);

  trigger.appendChild(labelWrapper);

  trigger.addEventListener('click', () => {
    activateWorkspaceSection(section.id);
  });

  node.appendChild(trigger);

  if (section.children) {
    const childContainer = document.createElement('div');
    childContainer.className = 'child-list';
    section.children.forEach((child) => {
      const childItem = buildWorkspaceNavItem(child, depth + 1);
      childContainer.appendChild(childItem);
    });
    node.appendChild(childContainer);
  }

  return node;
}

function renderWorkspaceNavTree(sections) {
  navTreeEl.innerHTML = '';
  sections.forEach((section) => {
    navTreeEl.appendChild(buildWorkspaceNavItem(section));
  });
}

function activateWorkspaceSection(sectionId) {
  const targetSection = findWorkspaceSection(sectionId, workspaceSections);
  if (!targetSection) return;

  activeWorkspaceSectionId = sectionId;

  [...navTreeEl.querySelectorAll('.tree-item')].forEach((item) => {
    item.classList.toggle('is-active', item.dataset.sectionId === sectionId);
  });

  renderWorkspaceSection(targetSection);
}

function findWorkspaceSection(sectionId, sections) {
  for (const section of sections) {
    if (section.id === sectionId) return section;
    if (section.children) {
      const found = findWorkspaceSection(sectionId, section.children);
      if (found) return found;
    }
  }
  return null;
}


function getProjectById(projectId) {
  return memberPortal.projects.find((project) => project.id === projectId) || null;
}

function buildMemberOrgTree() {
  const root = {
    id: 'gsk-projects',
    label: 'GSK Projects',
    type: 'group',
    searchText: 'GSK Projects',
    children: memberPortal.projects.map((project) => {
      const memberIds = memberPortal.members
        .filter((member) => member.assignedProjects.includes(project.id))
        .map((member) => member.id);
      return {
        id: project.id,
        label: project.label,
        type: 'project',
        owner: project.owner,
        timeline: project.timeline,
        memberIds,
        searchText: `${project.label} ${project.owner} ${project.timeline}`,
        children: memberIds.map((memberId) => {
          const member = memberPortal.members.find((item) => item.id === memberId);
          return {
            id: `${project.id}::${memberId}`,
            label: member?.name || '未匹配成员',
            type: 'member',
            role: member?.role || '',
            searchText: `${member?.name || ''} ${member?.role || ''} ${project.label}`
          };
        })
      };
    })
  };

  memberOrgTree = [root];
}

function buildOrgNavItem(unit, depth = 0) {
  const node = document.createElement('div');
  node.className = 'tree-node';
  node.style.setProperty('--depth', depth);

  const isLeaf = unit.type === 'member';
  const trigger = document.createElement(isLeaf ? 'div' : 'button');
  trigger.className = 'tree-item tree-item--org';
  trigger.dataset.searchText = unit.searchText || unit.label;
  trigger.style.paddingLeft = `${12 + depth * 18}px`;

  if (!isLeaf) {
    trigger.type = 'button';
    trigger.dataset.orgId = unit.id;
    if (unit.id === activeOrgUnitId) {
      trigger.classList.add('is-active');
    }
    trigger.addEventListener('click', () => {
      activateOrgUnit(unit.id);
    });
  } else {
    trigger.classList.add('tree-item--leaf');
  }

  const labelWrapper = document.createElement('div');
  labelWrapper.className = 'tree-item__label';

  const iconWrapper = document.createElement('span');
  const iconKey = unit.type === 'project' ? 'tasks' : 'org';
  iconWrapper.innerHTML = icons[iconKey] || icons.org;
  const iconElement = iconWrapper.firstElementChild;
  if (iconElement) {
    labelWrapper.appendChild(iconElement);
  }

  const label = document.createElement('span');
  label.textContent = unit.label;
  labelWrapper.appendChild(label);
  trigger.appendChild(labelWrapper);

  if (unit.type === 'group') {
    const meta = document.createElement('div');
    meta.className = 'tree-item__meta';
    meta.innerHTML = `<span>${unit.children?.length || 0} 个项目</span>`;
    trigger.appendChild(meta);
  }

  if (unit.type === 'project') {
    const meta = document.createElement('div');
    meta.className = 'tree-item__meta';
    meta.innerHTML = `<span>${unit.memberIds.length} 人</span><span>${unit.timeline}</span>`;

    const hint = document.createElement('span');
    hint.className = 'tree-item__hint';
    hint.textContent = `负责人 ${unit.owner}`;

    const details = document.createElement('div');
    details.className = 'tree-item__details';
    details.appendChild(meta);
    details.appendChild(hint);
    trigger.appendChild(details);
  }

  if (unit.type === 'member') {
    const hint = document.createElement('span');
    hint.className = 'tree-item__hint';
    hint.textContent = unit.role;
    trigger.appendChild(hint);
  }

  node.appendChild(trigger);

  if (unit.children && unit.children.length) {
    const childContainer = document.createElement('div');
    childContainer.className = 'child-list';
    unit.children.forEach((child) => {
      childContainer.appendChild(buildOrgNavItem(child, depth + 1));
    });
    node.appendChild(childContainer);
  }

  return node;
}

function renderMemberNavTree() {
  buildMemberOrgTree();
  navTreeEl.innerHTML = '';
  memberOrgTree.forEach((unit) => {
    navTreeEl.appendChild(buildOrgNavItem(unit));
  });
}

function findOrgUnit(orgId, units) {
  for (const unit of units) {
    if (unit.id === orgId) return unit;
    if (unit.children) {
      const found = findOrgUnit(orgId, unit.children);
      if (found) return found;
    }
  }
  return null;
}

function activateOrgUnit(orgId) {
  activeOrgUnitId = orgId;
  [...navTreeEl.querySelectorAll('.tree-item')].forEach((item) => {
    const shouldActivate = item.dataset.orgId === orgId;
    item.classList.toggle('is-active', shouldActivate);
  });
  renderMemberPortal();
}

function applyMemberFilters() {
  const searchKeyword = memberFiltersState.search.trim().toLowerCase();

  return memberPortal.members.filter((member) => {
    if (
      activeOrgUnitId &&
      activeOrgUnitId !== 'gsk-projects' &&
      !member.assignedProjects.includes(activeOrgUnitId)
    ) {
      return false;
    }

    if (searchKeyword) {
      const projectNames = member.assignedProjects
        .map((projectId) => getProjectById(projectId)?.label || projectId)
        .join(' ');
      const haystack = `${member.name} ${member.role} ${member.email} ${member.department} ${member.company} ${projectNames}`.toLowerCase();
      if (!haystack.includes(searchKeyword)) {
        return false;
      }
    }

    return true;
  });
}

function renderMemberPortal() {
  if (!memberOrgTree.length) {
    buildMemberOrgTree();
  }

  const activeUnit = activeOrgUnitId ? findOrgUnit(activeOrgUnitId, memberOrgTree) : null;
  let focusDescription = memberPortal.description;

  if (activeUnit) {
    if (activeUnit.type === 'project') {
      focusDescription = `${memberPortal.description} 当前聚焦项目：${activeUnit.label}（${activeUnit.memberIds.length} 名成员 · ${activeUnit.timeline}）。`;
    } else if (activeUnit.type === 'group') {
      focusDescription = `${memberPortal.description} 当前聚焦：${activeUnit.label}。`;
    }
  }

  sectionTitleEl.textContent = memberPortal.title;
  sectionDescriptionEl.textContent = focusDescription;
  sectionBodyEl.innerHTML = '';

  const controls = document.createElement('div');
  controls.className = 'member-controls';

  const searchWrapper = document.createElement('div');
  searchWrapper.className = 'member-controls__search';
  const searchInput = document.createElement('input');
  searchInput.type = 'search';
  searchInput.placeholder = '搜索姓名、邮箱或角色';
  searchInput.value = memberFiltersState.search;
  searchInput.addEventListener('input', (event) => {
    memberFiltersState.search = event.target.value;
    renderMemberPortal();
  });
  searchWrapper.appendChild(searchInput);
  controls.appendChild(searchWrapper);

  sectionBodyEl.appendChild(controls);

  const filteredMembers = applyMemberFilters();

  if (!filteredMembers.length) {
    const emptyState = document.createElement('div');
    emptyState.className = 'placeholder';
    emptyState.innerHTML = '<p>暂无符合条件的成员，尝试调整搜索词或切换项目。</p>';
    sectionBodyEl.appendChild(emptyState);
    return;
  }

  const table = document.createElement('div');
  table.className = 'member-table';

  const tableHeader = document.createElement('div');
  tableHeader.className = 'member-table__header';
  tableHeader.innerHTML = `
    <span>成员</span>
    <span>指派项目</span>
    <span>所属公司</span>
    <span class="member-table__header-actions">操作</span>
  `;
  table.appendChild(tableHeader);

  const tableBody = document.createElement('div');
  tableBody.className = 'member-table__body';

  filteredMembers.forEach((member) => {
    const assignments = member.assignedProjects || [];
    const projectNames = assignments
      .map((projectId) => getProjectById(projectId)?.label || projectId)
      .map((name) => `<span class="member-project">${name}</span>`)
      .join('');

    const row = document.createElement('article');
    row.className = 'member-row';
    row.innerHTML = `
      <div class="member-row__primary">
        <div class="member-row__avatar">${member.name.slice(0, 1)}</div>
        <div class="member-row__meta">
          <div class="member-row__name">${member.name}</div>
          <div class="member-row__role">${member.role} · ${member.department}</div>
          <div class="member-row__contact">${member.email}</div>
          <div class="member-row__tags">
            ${(member.tags || []).map((tag) => `<span class="member-tag">${tag}</span>`).join('')}
          </div>
        </div>
      </div>
      <div class="member-row__projects">${projectNames || '<span class="member-project">待分配</span>'}</div>
      <div class="member-row__company">${member.company}</div>
      <div class="member-row__actions">
        <button type="button" class="member-row__btn" data-action="edit" data-member="${member.id}">编辑</button>
      </div>
    `;

    tableBody.appendChild(row);
  });

  table.appendChild(tableBody);
  sectionBodyEl.appendChild(table);

  tableBody.querySelectorAll('.member-row__btn').forEach((button) => {
    button.addEventListener('click', (event) => {
      const memberId = event.currentTarget.dataset.member;
      const member = memberPortal.members.find((item) => item.id === memberId);
      if (!member) return;
      window.alert(`编辑 ${member.name}：更新基本信息、项目分配与公司属性。`);
    });
  });
}
function filterNav(keyword) {
  const trimmed = keyword.trim().toLowerCase();
  const nodes = Array.from(navTreeEl.querySelectorAll('.tree-node'));

  if (!trimmed) {
    nodes.forEach((node) => {
      node.style.display = 'flex';
    });
    return;
  }

  nodes.forEach((node) => {
    node.dataset.match = 'false';
  });

  nodes.forEach((node) => {
    const trigger = node.firstElementChild;
    const text = trigger?.dataset.searchText || trigger?.textContent || '';
    if (text.toLowerCase().includes(trimmed)) {
      node.dataset.match = 'true';
      let parent = node.parentElement?.closest('.tree-node');
      while (parent) {
        parent.dataset.match = 'true';
        parent = parent.parentElement?.closest('.tree-node');
      }
    }
  });

  nodes.forEach((node) => {
    node.style.display = node.dataset.match === 'true' ? 'flex' : 'none';
  });
}

function updateActionButtons() {
  if (currentView === 'members') {
    newAssetBtn.textContent = '+ 邀请成员';
    assignBtn.textContent = '批量调配项目';
    uploadBtn.textContent = '导出名册';
  } else {
    newAssetBtn.textContent = '+ 新建资产';
    assignBtn.textContent = '指派成员';
    uploadBtn.textContent = '上传资产';
  }
}

function setView(view) {
  currentView = view;

  viewToggleButtons.forEach((button) => {
    const isActive = button.dataset.view === view;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-selected', String(isActive));
  });

  navSearchEl.value = '';

  if (view === 'workspace') {
    navSearchEl.placeholder = '快速筛选...';
    renderWorkspaceNavTree(workspaceSections);
    if (!findWorkspaceSection(activeWorkspaceSectionId, workspaceSections)) {
      activeWorkspaceSectionId = workspaceSections[0].id;
    }
    activateWorkspaceSection(activeWorkspaceSectionId);
  } else {
    navSearchEl.placeholder = '搜索项目或成员';
    renderMemberNavTree();
    const hasActive = activeOrgUnitId && findOrgUnit(activeOrgUnitId, memberOrgTree);
    if (hasActive) {
      activateOrgUnit(activeOrgUnitId);
    } else if (memberOrgTree.length) {
      activateOrgUnit(memberOrgTree[0].id);
    } else {
      renderMemberPortal();
    }
  }

  updateActionButtons();
}

viewToggleButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const view = button.dataset.view;
    if (view) {
      setView(view);
    }
  });
});

navSearchEl.addEventListener('input', (event) => {
  filterNav(event.target.value);
});

newAssetBtn.addEventListener('click', () => {
  if (currentView === 'members') {
    window.alert('邀请成员：填写基本信息、绑定项目并同步欢迎包。');
  } else {
    window.alert('此处可唤起新建资产弹窗：选择模板、指派协作成员、设定到期时间。');
  }
});

assignBtn.addEventListener('click', () => {
  if (currentView === 'members') {
    window.alert('批量调配项目：选择成员、快速调整项目指派并同步给相关负责人。');
  } else {
    window.alert('快速指派成员：选择角色、设置截止时间并同步到任务清单。');
  }
});

uploadBtn.addEventListener('click', () => {
  if (currentView === 'members') {
    window.alert('导出名册：生成包含项目分配与公司信息的成员列表。');
  } else {
    window.alert('上传资产：支持文档、图片、视频等多格式，自动沉淀到对应模块。');
  }
});

setView('workspace');
