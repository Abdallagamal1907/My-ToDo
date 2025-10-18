import { DaySchedule } from '../types';

const arabicDays = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

const tasksTemplates = {
  networks: [
    'تعلم بروتوكولات الشبكات الأساسية (TCP/IP)',
    'دراسة نموذج OSI والطبقات السبعة',
    'فهم آلية عمل DNS وDHCP',
    'تعلم أساسيات Routing والتوجيه',
    'دراسة Subnetting وتقسيم الشبكات',
    'فهم Firewalls وأمن الشبكات',
    'تطبيق عملي على Linux Commands',
    'إدارة المستخدمين والصلاحيات في Linux',
    'تعلم Bash Scripting الأساسي',
    'فهم Linux File System',
    'دراسة Network Troubleshooting',
    'تعلم VLANs والشبكات الافتراضية',
    'فهم Load Balancing',
    'دراسة VPN والشبكات الخاصة',
    'تعلم Packet Analysis مع Wireshark',
    'فهم Network Security Protocols',
    'دراسة Linux Services (Apache, Nginx)',
    'تعلم Container Networking مع Docker',
    'فهم Kubernetes Networking',
    'دراسة Network Monitoring Tools',
    'تعلم Advanced Routing Protocols',
    'فهم Network Automation',
    'دراسة Cloud Networking (AWS/Azure)',
    'تعلم Software Defined Networking',
    'مراجعة شاملة للشبكات',
    'مراجعة شاملة لـ Linux'
  ],
  design: [
    'تطبيق عملي في Photoshop - التعديل على الصور',
    'تعلم Layer Masking في Photoshop',
    'دراسة Color Grading والألوان',
    'إنشاء تصميم Poster احترافي',
    'تعلم Typography وفن الخطوط',
    'مشروع Logo Design كامل',
    'تطبيق عملي في Premiere Pro - المونتاج الأساسي',
    'تعلم Transitions والانتقالات',
    'دراسة Color Correction في الفيديو',
    'تطبيق Audio Editing والصوتيات',
    'مشروع فيديو قصير كامل',
    'تعلم Keyframing في Premiere Pro',
    'تطبيق عملي في After Effects - Motion Graphics',
    'تعلم Text Animation',
    'دراسة Shape Layers والأشكال',
    'إنشاء Logo Animation',
    'تعلم Particle Effects',
    'دراسة 3D Layers في After Effects',
    'مشروع Explainer Video',
    'تعلم Expressions في After Effects',
    'دراسة Character Animation',
    'تطبيق Compositing متقدم',
    'مشروع Motion Graphics كامل',
    'تعلم Green Screen والـ Chroma Key',
    'دراسة Visual Effects المتقدمة',
    'مشروع نهائي شامل في الجرافيك'
  ],
  frontend: [
    'بناء مكون React تفاعلي بسيط',
    'فهم React Hooks (useState, useEffect)',
    'تطبيق Context API لإدارة الحالة',
    'بناء Form مع Validation',
    'تعلم React Router للتنقل',
    'إنشاء Custom Hooks',
    'دراسة Performance Optimization',
    'تطبيق Lazy Loading والتحميل الذكي',
    'بناء Dashboard متكامل',
    'تعلم TypeScript مع React',
    'دراسة State Management مع Redux',
    'تطبيق API Integration',
    'بناء Authentication System',
    'تعلم React Query لجلب البيانات',
    'دراسة Testing مع Jest وReact Testing Library',
    'تطبيق Responsive Design متقدم',
    'بناء E-commerce Product Page',
    'تعلم Animation Libraries (Framer Motion)',
    'دراسة SSR مع Next.js',
    'تطبيق SEO Best Practices',
    'بناء Real-time Chat Application',
    'تعلم WebSockets في React',
    'دراسة Progressive Web Apps (PWA)',
    'تطبيق Accessibility (a11y)',
    'بناء مشروع Portfolio كامل',
    'مراجعة شاملة ونشر المشاريع'
  ]
};

export function generateSchedule(): DaySchedule[] {
  const schedule: DaySchedule[] = [];
  const startDate = new Date(2025, 9, 18); // October 18, 2025

  for (let i = 0; i < 31; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);

    const dayOfWeek = currentDate.getDay();
    const isWednesday = dayOfWeek === 3;

    const dateString = currentDate.toISOString().split('T')[0];
    const dayName = arabicDays[dayOfWeek];

    const daySchedule: DaySchedule = {
      date: dateString,
      dayName,
      isWednesday,
      tasks: []
    };

    if (!isWednesday && i < tasksTemplates.networks.length) {
      daySchedule.tasks = [
        {
          id: `${dateString}-networks`,
          title: tasksTemplates.networks[i],
          category: 'networks',
          completed: false
        },
        {
          id: `${dateString}-design`,
          title: tasksTemplates.design[i],
          category: 'design',
          completed: false
        },
        {
          id: `${dateString}-frontend`,
          title: tasksTemplates.frontend[i],
          category: 'frontend',
          completed: false
        }
      ];
    }

    schedule.push(daySchedule);
  }

  return schedule;
}
