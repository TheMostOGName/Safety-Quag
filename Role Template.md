# The Role Template

Filling this out will allow Safety Quag to automatically give you roles when you join. You **ONLY** can add roles that you already have. Attempting to add roles will result in your template being ignored.

## The Template Itself

```
//<Your Discord Tag>
if (member.user.id == "<Your Discord ID>") {
        member.roles.add(<The Role You Want>).catch(console.error);
}
```
Anything in <> should be entirely replaced. <Your Discord Tag> should be replaced with your tag, <Your Discord ID> should be replaced with your ID (be careful not to copy a message ID, you must enable developer mode in settings to find IDs), and <The Role You Want> should be replaced with **the ID of the role you want**.
  
  
## Role IDs
All roles have an alies rather than their actual name. Here is a list of the role IDs and what they corrispond to. ONLY put role IDs in the template.
  
Format: 
Role IDs - Role Name in SQ
  
  quag - Quite Quaggers
  
  wooper - Wonderful Woopers
  
  sandshrew - Sandshrew Appreciator
  
  lotad - Legendary Lotads
  
  huntail - Happy Huntails
  
  samAsh - sam & ash
  
  tux - Tux
  
  theyPronoun - They/Them
  
  shePronoun - She/Her
  
  hePronoun - He/Him
  
  anyPronoun - Any Pronouns
  
  otherPronoun - Other Pronouns
  
  artist - Artist
  
  musician - Musician
  
  developer - Developer
  
  streamNotifs - Stream Notifications
  
  videoNotifs - Video Notifications
  
  trusted - Trusted
  
  vip - VIP
  
  archiveAccess - Archive Access
  
In addition, if you want more than one role, copy the "member.roles.add(<The Role You Want>).catch(console.error);" line and paste it directly bellow the current one, and add the role you want.
  
## Example
  
Here is an example for my account, getting the Trusted, They/Them, and Developer roles:
```
//Kenorbs#4955
if (member.user.id == "730177830201196585") {
        member.roles.add(trusted).catch(console.error);
        member.roles.add(theyPronoun).catch(console.error);
        member.roles.add(developer).catch(console.error);
}
```
  
This would be copied and pasted into the Role Template channel. 
