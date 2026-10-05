import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../shared/components/icon/icon.component';

interface LedgerModule {
  no: string;
  title: string;
  desc: string;
  tag: string;
  icon: 'box' | 'taka' | 'truck' | 'bar-chart' | 'layers' | 'shield';
}

interface TargetBusiness {
  type: string;
  benefit: string;
}

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink, IconComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {
  readonly modules: LedgerModule[] = [
    {
      no: '০১',
      title: 'ইনভেন্টরি ও বারকোড খাতা',
      desc: 'স্টক রিয়েল-টাইমে ট্র্যাকিং, অটোমেটিক লো-স্টক অ্যালার্ট এবং দ্রুত স্ক্যানিংয়ের জন্য বারকোড জেনারেশন।',
      tag: 'স্টক ম্যানেজমেন্ট',
      icon: 'box',
    },
    {
      no: '০২',
      title: 'স্মার্ট POS ও ক্যাশ রেজিস্টার',
      desc: 'মুহূর্তেই বিল তৈরি, রিসিট প্রিন্ট এবং ক্যাশ, বিকাশ বা নগদে পেমেন্ট হিসাব সরাসরি খাতায় এন্ট্রি।',
      tag: 'বিক্রয় ও কাউন্টার',
      icon: 'taka',
    },
    {
      no: '০৩',
      title: 'সাপ্লায়ার ও পারচেজ লেজার',
      desc: 'সাপ্লায়ারের বাকি-বকেয়া, লেজার স্টেটমেন্ট, পেমেন্ট ট্র্যাকিং এবং পারচেজ রিটার্ন এক জায়গায়।',
      tag: 'ক্রয় ও বকেয়া',
      icon: 'truck',
    },
    {
      no: '০৪',
      title: 'লাভ-ক্ষতি ও রিয়েল-টাইম হিসাব',
      desc: 'প্রতিদিনের মোট বিক্রি, কেনা দাম বাদ দিয়ে নিট লাভ এবং খরচের স্বয়ংক্রিয় হিসাব ও অ্যানালিটিক্স।',
      tag: 'হিসাব ও রিপোর্ট',
      icon: 'bar-chart',
    },
    {
      no: '০৫',
      title: 'মাল্টি-ব্রাঞ্চ ও অ্যাক্সেস কন্ট্রোল',
      desc: 'একাধিক দোকান থাকলে একই সাথে পরিচালনা এবং কর্মচারীদের নির্দিষ্ট রোল অনুযায়ী অ্যাক্সেস প্রদান।',
      tag: 'শাখা ও স্টাফ',
      icon: 'layers',
    },
    {
      no: '০৬',
      title: 'ডিজিটাল স্টোরফ্রন্ট',
      desc: 'ইনভেন্টরি থেকেই কোনো বাড়তি কোডিং ছাড়া নিজের অনলাইন ক্যাটালগ তৈরি এবং সরাসরি কাস্টমার অর্ডার গ্রহণ।',
      tag: 'অনলাইন শপ',
      icon: 'shield',
    },
  ];

  readonly targetBusinesses: TargetBusiness[] = [
    { type: 'মুদি ও ডিপার্টমেন্টাল স্টোর', benefit: 'হাজারো পণ্যের বারকোড হিসাব ও লো-স্টক অ্যালার্ট' },
    { type: 'ফ্যাশন ও ক্লথিং শপ', benefit: 'সাইজ/কালার ভ্যারিয়েন্ট ও দ্রুত POS বিলিং' },
    { type: 'ইলেকট্রনিক্স ও হার্ডওয়্যার', benefit: 'সাপ্লায়ার লেজার ও পারচেজ হিস্ট্রি ট্র্যাকিং' },
    { type: 'ফার্মেসি ও সার্জিক্যাল', benefit: 'ব্যাচ নম্বর, মেয়াদ উত্তীর্ণের অ্যালার্ট ও বাকি খাতা' },
    { type: 'হোলসেল ও পাইকারি ব্যবসা', benefit: 'বাল্ক পেমেন্ট, কাস্টমার বাকি ট্র্যাকিং ও চালান' },
    { type: 'অনলাইন পেজ ও ই-কমার্স', benefit: 'অটোমেটিক ইনভেন্টরি সিঙ্ক ও ক্যাটালগ লিংক' },
  ];
}