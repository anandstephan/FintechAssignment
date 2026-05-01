export const mockResponse = {
  screen: {
    screen_id: 'home_dashboard_v2',
    version: '2.1.0',
    feature_flags: {
      show_wallet_section: true,
      show_recommendation_section: true,
      enable_live_gold_rate: true,
    },
    components: [
      {
        type: 'header',
        data: {
          greeting: 'Good Morning',
          user_name: 'Anupam',
          profile_icon: 'https://ui-avatars.com/api/?name=Anupam&background=C8960C&color=fff',
          notification_icon: 'https://cdn-icons-png.flaticon.com/512/3119/3119338.png',
        },
      },
      {
        type: 'gold_rate_banner',
        data: {
          title: "Today's Gold Rate",
          price: 'Rs.9,245 / gram',
          change: '+Rs.75',
          updated_at: '10:30 AM',
          cta_text: 'Buy Now',
        },
      },
      {
        type: 'investment_cards',
        data: {
          items: [
            {
              title: 'Start SIP',
              description: 'Invest monthly with discipline',
              icon: 'https://cdn-icons-png.flaticon.com/512/2800/2800160.png',
              cta: 'Start Now',
            },
            {
              title: 'One-Time Buy',
              description: 'Instant purchase of digital gold',
              icon: 'https://cdn-icons-png.flaticon.com/512/3503/3503194.png',
              cta: 'Buy Gold',
            },
          ],
        },
      },
      {
        type: 'banner_carousel',
        data: {
          items: [
            {
              image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&q=80&w=800',
              redirect_url: '/offers/summer',
            },
            {
              image: 'https://images.unsplash.com/photo-1599690925059-86687258384a?auto=format&fit=crop&q=80&w=800',
              redirect_url: '/offers/festival',
            },
          ],
        },
      },
      {
        type: 'dynamic_form',
        data: {
          title: 'Calculate Your Investment',
          fields: [
            {
              type: 'input',
              label: 'Investment Amount',
              placeholder: 'Enter amount',
            },
            {
              type: 'dropdown',
              label: 'Duration',
              options: ['6 Months', '12 Months', '24 Months'],
            },
          ],
          cta: 'Calculate',
        },
      },
      {
        type: 'faq_section',
        data: {
          items: [
            {
              question: 'Is digital gold safe?',
              answer: 'Yes, it is backed by physical gold.',
            },
            {
              question: 'Can I redeem physical gold?',
              answer: 'Yes, based on available redemption options.',
            },
          ],
        },
      },
      {
        type: 'sticky_cta',
        data: { text: 'Start Investment' },
      },
    ],
  },
};
