/**
 * LogisticsDetailModal Component
 *
 * Displays detailed tracking and logistics information for hospital devices.
 * Features two distinct views based on patient type:
 * - Inpatient: Shows ward assignment timeline and device journey history
 * - Community/Outpatient: Shows courier tracking with step progress and delivery history
 *
 * Includes a fake browser chrome UI with address bar and colored dots for visual appeal.
 * Displays device status, battery level, and management department information in the sidebar.
 *
 * @component
 */

import React, { useState } from 'react';
import {
  Truck,
  X,
  UserCheck,
  Battery,
  RotateCcw,
  Activity,
  Clock,
  CheckCircle,
  Box,
  Loader2,
  Search,
  Globe,
  Package,
  Check,
} from 'lucide-react';
import LinearBattery from '../common/LinearBattery';

const LogisticsDetailModal = ({ item, onClose }) => {
  const [trackingSearch, setTrackingSearch] = useState('');

  const statusMap = {
    STORAGE: { label: '보관중', color: 'bg-gray-500', textColor: 'text-gray-400' },
    DISPATCH: { label: '배송중', color: 'bg-blue-500', textColor: 'text-blue-400' },
    DELIVERED: { label: '배송완료', color: 'bg-green-500', textColor: 'text-green-400' },
    IN_USE: { label: '사용중', color: 'bg-purple-500', textColor: 'text-purple-400' },
    RETURN: { label: '반품', color: 'bg-orange-500', textColor: 'text-orange-400' },
    CLEANING: { label: '세척중', color: 'bg-cyan-500', textColor: 'text-cyan-400' },
    REPAIR: { label: '수리중', color: 'bg-red-500', textColor: 'text-red-400' },
  };

  const inpatientTimeline = [
    { event: '착용시작', date: '2024-01-15 09:30', icon: UserCheck },
    { event: '충전', date: '2024-01-16 14:20', icon: Battery },
    { event: '제거', date: '2024-01-17 11:45', icon: RotateCcw },
    { event: '재착용', date: '2024-01-18 08:15', icon: Activity },
  ];

  const courseSteps = [
    { label: '상품준비', completed: true },
    { label: '집화처리', completed: true },
    { label: '배송중', completed: item?.status === 'IN_USE' },
    { label: '배송완료', completed: item?.status === 'DELIVERED' },
  ];

  const deliveryHistory = [
    { step: '상품준비', time: '2024-01-15 10:00', status: '완료' },
    { step: '집화처리', time: '2024-01-15 14:30', status: '완료' },
    { step: '배송중', time: '2024-01-16 09:00', status: '진행중' },
    { step: '배송완료', time: '-', status: '대기중' },
  ];

  const isInpatient = item?.patientType === 'INPATIENT';
  const isStorage = item?.status === 'STORAGE';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-slate-700">

        {/* Browser Chrome */}
        <div className="bg-slate-800 border-b border-slate-700">
          {/* Traffic Lights */}
          <div className="flex items-center gap-2 px-4 py-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div className="flex-1 ml-4 bg-slate-700 rounded px-3 py-1 text-xs text-slate-400">
              <Globe className="w-3 h-3 inline mr-2" />
              cart-vital-logistics.hospital.local
            </div>
            <X
              onClick={onClose}
              className="w-5 h-5 text-slate-400 hover:text-white cursor-pointer"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex h-[calc(90vh-50px)]">

          {/* Sidebar */}
          <div className="w-64 bg-slate-800 border-r border-slate-700 p-4 space-y-6 overflow-y-auto">
            {/* Device ID */}
            <div>
              <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Device ID</div>
              <div className="text-sm font-mono text-blue-400">{item?.id}</div>
            </div>

            {/* Status */}
            <div>
              <div className="text-xs text-slate-500 uppercase tracking-wide mb-2">Status</div>
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusMap[item?.status]?.color}`}>
                {statusMap[item?.status]?.label}
              </div>
            </div>

            {/* Battery */}
            <div>
              <div className="text-xs text-slate-500 uppercase tracking-wide mb-2">Battery</div>
              <LinearBattery value={item?.battery || 75} />
              <div className="text-xs text-slate-400 mt-1">{item?.battery || 75}%</div>
            </div>

            {/* Management Department */}
            <div>
              <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Management Dept</div>
              <div className="text-sm text-slate-300">Device Operations</div>
            </div>

            {/* Patient Info */}
            <div>
              <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Patient</div>
              <div className="text-sm text-slate-300">{item?.patientName}</div>
              <div className="text-xs text-slate-500 mt-1">
                {item?.patientType === 'INPATIENT' ? '입원환자' : '외래/재택'}
              </div>
            </div>

            {/* Last Sync */}
            <div>
              <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Last Sync</div>
              <div className="text-xs text-slate-400">{item?.lastSync}</div>
            </div>
          </div>

          {/* Main Panel */}
          <div className="flex-1 overflow-y-auto">
            {isStorage ? (
              // Storage Empty State
              <div className="h-full flex flex-col items-center justify-center p-8">
                <Box className="w-16 h-16 text-slate-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-300 mb-2">발송 전인 기기입니다</h3>
                <p className="text-sm text-slate-500">기기가 배송 대기 중입니다</p>
              </div>
            ) : isInpatient ? (
              // Inpatient Timeline View
              <div className="p-8">
                <h2 className="text-2xl font-bold text-white mb-2">병동 배치 정보</h2>
                <p className="text-slate-400 mb-6">device tracking timeline</p>

                {/* Ward Info Card */}
                <div className="bg-slate-800 rounded-lg p-4 mb-8 border border-slate-700">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-slate-500 uppercase mb-1">Ward</div>
                      <div className="text-sm font-semibold text-white">내과 3병동</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase mb-1">Room</div>
                      <div className="text-sm font-semibold text-white">314-B</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase mb-1">Wear Date</div>
                      <div className="text-sm font-semibold text-white">{item?.wearDate}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase mb-1">Admission Date</div>
                      <div className="text-sm font-semibold text-white">2024-01-10</div>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <h3 className="text-lg font-semibold text-white mb-4">Device Journey</h3>
                <div className="space-y-4">
                  {inpatientTimeline.map((event, idx) => {
                    const IconComponent = event.icon;
                    return (
                      <div key={idx} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500 flex items-center justify-center">
                            <IconComponent className="w-5 h-5 text-blue-400" />
                          </div>
                          {idx < inpatientTimeline.length - 1 && (
                            <div className="w-0.5 h-12 bg-slate-700 my-2"></div>
                          )}
                        </div>
                        <div className="pt-2">
                          <div className="font-semibold text-white">{event.event}</div>
                          <div className="text-sm text-slate-400 flex items-center gap-2 mt-1">
                            <Clock className="w-4 h-4" />
                            {event.date}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              // Community/Outpatient Courier Tracking View
              <div className="p-8">
                <h2 className="text-2xl font-bold text-white mb-2">배송 추적</h2>
                <p className="text-slate-400 mb-6">courier tracking information</p>

                {/* Tracking Search */}
                <div className="bg-slate-800 rounded-lg p-4 mb-8 border border-slate-700">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={trackingSearch}
                      onChange={(e) => setTrackingSearch(e.target.value)}
                      placeholder="Tracking number..."
                      className="flex-1 bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white placeholder-slate-500 text-sm"
                    />
                    <button className="bg-blue-600 hover:bg-blue-700 p-2 rounded transition">
                      <Search className="w-5 h-5 text-white" />
                    </button>
                  </div>
                  <div className="mt-3 text-xs text-slate-400">
                    Tracking #: <span className="font-mono text-blue-400">DEV-2024-001234</span>
                  </div>
                </div>

                {/* Progress Steps */}
                <h3 className="text-lg font-semibold text-white mb-4">Delivery Progress</h3>
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-6">
                    {courseSteps.map((step, idx) => (
                      <div key={idx} className="flex flex-col items-center flex-1">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition ${
                            step.completed
                              ? 'bg-green-500 border border-green-400'
                              : 'bg-slate-700 border border-slate-600'
                          }`}
                        >
                          {step.completed ? (
                            <Check className="w-5 h-5 text-white" />
                          ) : (
                            <Loader2 className="w-5 h-5 text-slate-400 animate-spin" />
                          )}
                        </div>
                        <div className="text-xs text-center text-slate-400">{step.label}</div>
                        {idx < courseSteps.length - 1 && (
                          <div
                            className={`absolute w-12 h-0.5 mt-4 transition ${
                              step.completed ? 'bg-green-500' : 'bg-slate-700'
                            }`}
                            style={{ marginLeft: '2.5rem' }}
                          ></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery History Table */}
                <h3 className="text-lg font-semibold text-white mb-4">Delivery History</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="text-left px-4 py-3 text-slate-400 font-semibold">Step</th>
                        <th className="text-left px-4 py-3 text-slate-400 font-semibold">Time</th>
                        <th className="text-left px-4 py-3 text-slate-400 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deliveryHistory.map((entry, idx) => (
                        <tr key={idx} className="border-b border-slate-800 hover:bg-slate-800/50 transition">
                          <td className="px-4 py-3 text-slate-300 flex items-center gap-2">
                            <Package className="w-4 h-4 text-blue-400" />
                            {entry.step}
                          </td>
                          <td className="px-4 py-3 text-slate-400">{entry.time}</td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                                entry.status === '완료'
                                  ? 'bg-green-500/20 text-green-400'
                                  : entry.status === '진행중'
                                  ? 'bg-blue-500/20 text-blue-400'
                                  : 'bg-slate-700/50 text-slate-400'
                              }`}
                            >
                              {entry.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogisticsDetailModal;
