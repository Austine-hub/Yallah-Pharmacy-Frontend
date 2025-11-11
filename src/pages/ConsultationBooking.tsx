import React, { useState } from 'react';
import styles from './ConsultationBooking.module.css';
import { Check, Calendar, Clock, User, Mail, Phone, FileText } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
}

interface FormData {
  service: string;
  consentGiven: boolean;
  selectedDate: string;
  selectedTime: string;
  recipient: 'myself' | 'dependent';
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  email: string;
  notes: string;
}

const services: Service[] = [
  {
    id: 'family-planning',
    title: 'FAMILY PLANNING',
    description: 'Services providing information, counseling, and access to contraceptives to help individuals and couples plan and space pregnancies.'
  },
  {
    id: 'general-health',
    title: 'GENERAL HEALTH',
    description: 'Comprehensive consultations focused on preventive care, wellness, and the management of common health conditions to help you stay healthy.'
  },
  {
    id: 'iv-therapy',
    title: 'IV THERAPY',
    description: 'Administration of intravenous fluids, vitamins, or medications to support hydration, recovery, or specific medical needs.'
  },
  {
    id: 'mzima-package',
    title: 'MZIMA PACKAGE',
    description: 'Comprehensive chronic care program offering personalized health plans, regular consultations, medication refills, and wellness support for conditions such as diabetes, hypertension, asthma, arthritis, and other long-term illnesses.'
  },
  {
    id: 'prep-pep',
    title: 'PREP/PEP',
    description: 'Guidance on HIV prevention, including Pre-Exposure Prophylaxis (PrEP) for at-risk individuals and Post-Exposure Prophylaxis (PEP) after potential exposure.'
  }
];

const timeSlots = [
  '4:00 PM', '4:30 PM', '5:00 PM', '6:30 PM', '6:00 PM', '6:30 PM',
  '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM',
  '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM',
  '1:30 PM'
];

const ConsultationBooking: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    service: '',
    consentGiven: false,
    selectedDate: '',
    selectedTime: '',
    recipient: 'myself',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    phone: '',
    email: '',
    notes: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const steps = [
    { number: 1, title: 'Select A Service' },
    { number: 2, title: 'Consent Form' },
    { number: 3, title: 'Set Consultation Time & Date' },
    { number: 4, title: 'Add Consultation Details' }
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowSuccess(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateCalendarDays = () => {
    const days = [];
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.service !== '';
      case 2:
        return formData.consentGiven;
      case 3:
        return formData.selectedDate !== '' && formData.selectedTime !== '';
      case 4:
        return formData.firstName && formData.lastName && formData.dateOfBirth && 
               formData.gender && formData.phone && formData.email;
      default:
        return false;
    }
  };

  return (
    <div className={styles.container}>
<div className={styles.progressBar}>
        <div className={styles.stepCounter}>
          <span className={styles.currentStepNumber}>{currentStep}</span>
          <span className={styles.stepDivider}>/</span>
          <span className={styles.totalSteps}>{steps.length}</span>
        </div>
        <div className={styles.stepTitle}>{steps[currentStep - 1].title}</div>
        <div className={styles.progressBarTrack}>
          <div 
            className={styles.progressBarFill} 
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>

      <div className={styles.content}>
        {currentStep === 1 && (
          <div className={styles.step}>
            <h2>Request an online consultation</h2>
            <p className={styles.subtitle}>What would you like to discuss during your online consultation?</p>
            
            <div className={styles.serviceGrid}>
              {services.map(service => (
                <label key={service.id} className={styles.serviceCard}>
                  <input
                    type="radio"
                    name="service"
                    value={service.id}
                    checked={formData.service === service.id}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                    className={styles.radioInput}
                  />
                  <div className={styles.serviceContent}>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className={styles.step}>
            <h2>Request an online consultation</h2>
            <h3 className={styles.consentTitle}>YALLAH TELEHEALTH PATIENT CONSENT FORM</h3>
            <p className={styles.consentSubtitle}>By clicking "I agree" you are hereby consenting to:</p>
            
            <div className={styles.consentBox}>
              <div className={styles.consentSection}>
                <h4>Consent</h4>
                <p>YALLAH holding and processing any data (including sensitive data) provided by you to YALLAH for all purposes relating to your medical consultation including for the purpose of evaluating and diagnosing your medical condition and any other health complaints, using appropriate telecommunication technologies.</p>
              </div>

              <ul className={styles.consentList}>
                <li>Authorizing YALLAH to use appropriate telecommunications for evaluating and diagnosing medical conditions and health complaints.</li>
                <li>Understanding that laws protecting medical information confidentiality apply to telemedicine, ensuring disclosed information remains confidential.</li>
                <li>Acknowledging that personal data may be disclosed if requested or required by law, regulatory authority, or governmental agency regulations.</li>
                <li>Accepting the need for a PC, laptop, or mobile device with a good internet connection for effective telemedicine appointments.</li>
                <li>Understanding the risks, benefits, and alternatives of telehealth, including access to specialists and information without travel, though face-to-face consultations may still be necessary due to specific conditions or technical issues.</li>
                <li>Recognizing that, despite prioritizing data security, rare failures in security protocols could lead to a breach of patient privacy.</li>
                <li>Understanding that telemedicine involves audio, video, or electronic communications for consultations, diagnosis, therapy, follow-up, and/or education.</li>
              </ul>

              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={formData.consentGiven}
                  onChange={(e) => setFormData({...formData, consentGiven: e.target.checked})}
                />
                <span>I agree to the terms and conditions</span>
              </label>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className={styles.step}>
            <h2>Select Consultation date and Time</h2>
            <p className={styles.subtitle}>By selecting your convenient date and time, book your consultation.</p>
            
            <div className={styles.dateTimeGrid}>
              <div className={styles.calendarSection}>
                <h3><Calendar size={20} /> Select Date</h3>
                <div className={styles.calendar}>
                  <div className={styles.calendarHeader}>
                    <button type="button">&lt;</button>
                    <span>November 2025</span>
                    <button type="button">&gt;</button>
                  </div>
                  <div className={styles.calendarWeekdays}>
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                      <div key={day}>{day}</div>
                    ))}
                  </div>
                  <div className={styles.calendarDays}>
                    {generateCalendarDays().map((day, index) => (
                      <button
                        key={index}
                        type="button"
                        className={`${styles.calendarDay} ${
                          day === 11 ? styles.selectedDay : ''
                        } ${!day ? styles.emptyDay : ''}`}
                        onClick={() => day && setFormData({...formData, selectedDate: `2025-11-${day}`})}
                        disabled={!day}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                  <div className={styles.timezone}>
                    <Clock size={16} /> Central European Time (08:11 PM)
                  </div>
                </div>
              </div>

              <div className={styles.timeSection}>
                <h3><Clock size={20} /> Select Time</h3>
                <div className={styles.timeInfo}>
                  <Clock size={16} />
                  <span>Duration: 30 Min</span>
                </div>
                <div className={styles.mediumInfo}>
                  <span>Medium: Video Consultation</span>
                </div>
                <div className={styles.timeSlots}>
                  {timeSlots.map(time => (
                    <button
                      key={time}
                      type="button"
                      className={`${styles.timeSlot} ${
                        formData.selectedTime === time ? styles.selectedTime : ''
                      }`}
                      onClick={() => setFormData({...formData, selectedTime: time})}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className={styles.step}>
            <h2>Set your Recipient</h2>
            <p className={styles.subtitle}>Following details are required to proceed to the next step.</p>
            
            <div className={styles.recipientToggle}>
              <label className={styles.toggleOption}>
                <input
                  type="radio"
                  name="recipient"
                  value="myself"
                  checked={formData.recipient === 'myself'}
                  onChange={(e) => setFormData({...formData, recipient: e.target.value as 'myself' | 'dependent'})}
                />
                <span>Myself</span>
              </label>
              <label className={styles.toggleOption}>
                <input
                  type="radio"
                  name="recipient"
                  value="dependent"
                  checked={formData.recipient === 'dependent'}
                  onChange={(e) => setFormData({...formData, recipient: e.target.value as 'myself' | 'dependent'})}
                />
                <span>Dependent</span>
              </label>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>First Name *</label>
                <div className={styles.inputWrapper}>
                  <User size={18} />
                  <input
                    type="text"
                    placeholder="Enter Your First Name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Last Name *</label>
                <div className={styles.inputWrapper}>
                  <User size={18} />
                  <input
                    type="text"
                    placeholder="Enter Your Last Name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Date of Birth *</label>
                <div className={styles.inputWrapper}>
                  <Calendar size={18} />
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Gender *</label>
                <div className={styles.inputWrapper}>
                  <User size={18} />
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Phone No.</label>
                <div className={styles.inputWrapper}>
                  <Phone size={18} />
                  <input
                    type="tel"
                    placeholder="Phone No."
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>E-mail</label>
                <div className={styles.inputWrapper}>
                  <Mail size={18} />
                  <input
                    type="email"
                    placeholder="E-mail"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Additional Notes</label>
              <div className={styles.inputWrapper}>
                <FileText size={18} />
                <textarea
                  placeholder="Enter Any Other Details You Want Us To Know"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  rows={4}
                />
              </div>
            </div>
          </div>
        )}

        <div className={styles.actions}>
          {currentStep > 1 && (
            <button type="button" className={styles.backButton} onClick={handleBack}>
              &lt; Back
            </button>
          )}
          <button
            type="button"
            className={styles.continueButton}
            onClick={handleNext}
            disabled={!canProceed()}
          >
            {currentStep === 4 ? 'Schedule Event' : 'Continue'}
          </button>
        </div>
      </div>

      {showSuccess && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button className={styles.closeModal} onClick={() => setShowSuccess(false)}>×</button>
            <div className={styles.successIcon}>
              <Check size={48} />
            </div>
            <h2>Consultation Booking Complete</h2>
            <p>Your consultation booking is complete.</p>
            <div className={styles.modalActions}>
              <button className={styles.secondaryButton} onClick={() => {
                setShowSuccess(false);
                setCurrentStep(1);
                setFormData({
                  service: '',
                  consentGiven: false,
                  selectedDate: '',
                  selectedTime: '',
                  recipient: 'myself',
                  firstName: '',
                  lastName: '',
                  dateOfBirth: '',
                  gender: '',
                  phone: '',
                  email: '',
                  notes: ''
                });
              }}>
                Book Another Consultation
              </button>
              <button className={styles.primaryButton} onClick={() => setShowSuccess(false)}>
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultationBooking;