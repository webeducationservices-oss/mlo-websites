/* ========================================
   MLO Websites — Global JS
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile Nav ---------- */
  const toggle = document.querySelector('.mobile-toggle');
  const nav    = document.querySelector('.nav-links');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        nav.classList.remove('open');
      });
    });
  }

  /* ---------- FAQ Accordion ---------- */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const isOpen = item.classList.contains('active');
      // close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      if (!isOpen) item.classList.add('active');
    });
  });

  /* ---------- Form Tabs ---------- */
  document.querySelectorAll('.form-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      // tabs
      document.querySelectorAll('.form-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      // panels
      document.querySelectorAll('.form-panel').forEach(p => p.classList.remove('active'));
      const panel = document.getElementById(target);
      if (panel) panel.classList.add('active');
    });
  });

  /* ---------- Multi-Step Wizard ---------- */
  function initWizard(formPanel) {
    const panels = formPanel.querySelectorAll('.wizard-panel');
    const progress = formPanel.querySelector('.wizard-progress');
    if (!panels.length || !progress) return;

    const totalSteps = parseInt(progress.dataset.steps) || panels.length;
    const progressBar = progress.querySelector('.wizard-progress-bar');
    const stepIndicators = progress.querySelectorAll('.wizard-step');

    function goToStep(stepNum) {
      // Validate current step required fields before moving forward
      const currentPanel = formPanel.querySelector('.wizard-panel.active');
      const currentStep = parseInt(currentPanel.dataset.step);

      if (stepNum > currentStep) {
        const requiredFields = currentPanel.querySelectorAll('input[required], select[required], textarea[required]');
        let valid = true;
        requiredFields.forEach(field => {
          if (!field.value.trim()) {
            field.classList.add('field-error');
            valid = false;
            // Remove error state on focus
            field.addEventListener('focus', function handler() {
              field.classList.remove('field-error');
              field.removeEventListener('focus', handler);
            });
          }
        });
        if (!valid) {
          // Scroll to first invalid field
          const firstError = currentPanel.querySelector('.field-error');
          if (firstError) {
            firstError.focus();
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
          return;
        }
      }

      // Hide all panels, show target
      panels.forEach(p => p.classList.remove('active'));
      const target = formPanel.querySelector(`.wizard-panel[data-step="${stepNum}"]`);
      if (target) target.classList.add('active');

      // Update progress bar
      const pct = (stepNum / totalSteps) * 100;
      progressBar.style.width = pct + '%';

      // Update step indicators
      stepIndicators.forEach(ind => {
        const indStep = parseInt(ind.dataset.step);
        ind.classList.remove('active', 'completed');
        if (indStep < stepNum) ind.classList.add('completed');
        else if (indStep === stepNum) ind.classList.add('active');
      });

      // Scroll to top of form
      const formTop = formPanel.closest('form') || formPanel;
      formTop.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Next buttons
    formPanel.querySelectorAll('.wizard-next').forEach(btn => {
      btn.addEventListener('click', () => {
        const current = formPanel.querySelector('.wizard-panel.active');
        const step = parseInt(current.dataset.step);
        if (step < totalSteps) goToStep(step + 1);
      });
    });

    // Prev buttons
    formPanel.querySelectorAll('.wizard-prev').forEach(btn => {
      btn.addEventListener('click', () => {
        const current = formPanel.querySelector('.wizard-panel.active');
        const step = parseInt(current.dataset.step);
        if (step > 1) goToStep(step - 1);
      });
    });

    // Allow clicking step indicators to navigate (only to completed or current steps)
    stepIndicators.forEach(ind => {
      ind.style.cursor = 'pointer';
      ind.addEventListener('click', () => {
        const targetStep = parseInt(ind.dataset.step);
        const currentPanel = formPanel.querySelector('.wizard-panel.active');
        const currentStep = parseInt(currentPanel.dataset.step);
        // Only allow going backward or to current step
        if (targetStep <= currentStep) {
          goToStep(targetStep);
        }
      });
    });
  }

  // Initialize all wizards
  document.querySelectorAll('.form-panel').forEach(panel => {
    if (panel.querySelector('.wizard-progress')) {
      initWizard(panel);
    }
  });

  /* ---------- Scroll Animation ---------- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));

  /* ---------- File Upload Label ---------- */
  document.querySelectorAll('.file-upload input[type="file"]').forEach(input => {
    input.addEventListener('change', () => {
      const label = input.closest('.file-upload').querySelector('.file-name');
      if (label && input.files.length) {
        label.textContent = input.files[0].name;
      }
    });
  });

  /* ---------- Form Submission (demo) ---------- */
  document.querySelectorAll('form[data-ajax]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const success = form.querySelector('.form-success');
      const fields  = form.querySelector('.form-fields');
      if (success && fields) {
        fields.style.display = 'none';
        success.classList.add('show');
        // Scroll to success message
        success.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---------- Smooth scroll for anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
