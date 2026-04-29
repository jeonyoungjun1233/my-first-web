# AI Wireframes - Ch7

These wireframes are AI-generated low-fidelity drafts for the Ch7 architecture assignment. The repository includes both text drafts and SVG image files so the "2 or more wireframes" submission requirement is easy to verify.

Image files:

- `wireframes/home-page-wireframe.svg`
- `wireframes/new-post-wireframe.svg`

## 1. Home Page

```text
┌────────────────────────────────────────────────────────────┐
│ Header: RED CHI BLOG                 홈  블로그  새 글 쓰기 │
├────────────────────────────────────────────────────────────┤
│ Hero / Profile                                             │
│ ┌──────────────────────────────┐ ┌───────────────────────┐ │
│ │ Site title + intro copy      │ │ Profile summary       │ │
│ │ Primary CTA: 글 목록 보기    │ │ Stats: posts/checks   │ │
│ │ Secondary CTA: 새 글 쓰기    │ │ Deployment URL        │ │
│ └──────────────────────────────┘ └───────────────────────┘ │
├────────────────────────────────────────────────────────────┤
│ Featured Post Cards                         Checklist       │
│ ┌──────────────┐ ┌──────────────┐       ┌───────────────┐ │
│ │ Category     │ │ Category     │       │ 완료 항목     │ │
│ │ Title        │ │ Title        │       │ 체크리스트    │ │
│ │ Summary      │ │ Summary      │       └───────────────┘ │
│ └──────────────┘ └──────────────┘                         │
└────────────────────────────────────────────────────────────┘
```

Expected shadcn/ui mapping:

- Post cards: `Card`
- Main action: `Button`
- Future search entry: `Input`

## 2. New Post Page

```text
┌────────────────────────────────────────────────────────────┐
│ Header: RED CHI BLOG                 홈  블로그  새 글 쓰기 │
├────────────────────────────────────────────────────────────┤
│ New Post Form                                  Side Panel   │
│ ┌──────────────────────────────────────┐ ┌───────────────┐ │
│ │ Label: 제목                          │ │ Live Preview  │ │
│ │ [ Input: title                    ]  │ │ Title         │ │
│ │                                      │ │ Content       │ │
│ │ Label: 내용                          │ └───────────────┘ │
│ │ [ Textarea: content               ]  │ ┌───────────────┐ │
│ │ [ 저장하고 목록으로 이동 ] [ 목록 ]  │ │ Concept Notes │ │
│ └──────────────────────────────────────┘ └───────────────┘ │
└────────────────────────────────────────────────────────────┘
```

Expected shadcn/ui mapping:

- Title field: `Input`
- Submit/back actions: `Button`
- Preview and notes: `Card`
- Future delete confirmation: `Dialog`

## 3. Post List Page

```text
┌────────────────────────────────────────────────────────────┐
│ Route intro: Chapter 6 Posts               [새 글 쓰기]     │
├────────────────────────────────────────────────────────────┤
│ [ Search input                                          ]   │
│ ┌──────────────┐ ┌──────────────┐ ┌─────────────────────┐ │
│ │ Post title   │ │ Post title   │ │ Checklist / Flow    │ │
│ │ Summary      │ │ Summary      │ │ verification panel  │ │
│ │ Delete       │ │ Delete       │ └─────────────────────┘ │
│ └──────────────┘ └──────────────┘                         │
└────────────────────────────────────────────────────────────┘
```

Expected shadcn/ui mapping:

- Search: `Input`
- Post results: `Card`
- Delete action: `Button`
- Confirmation later: `Dialog`
