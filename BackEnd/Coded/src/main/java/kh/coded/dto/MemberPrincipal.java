package kh.coded.dto;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

public class MemberPrincipal implements UserDetails, OAuth2User{
	//Our DB User
		private MemberDTO user;

		//UserDetails
		//private Collection<GrantedAuthority> authorities;
		private boolean locked = false;

		//OAuth
		private Map<String, Object> attributes;

		public MemberPrincipal() {
			super();
		}

		//select 용
		public MemberPrincipal(MemberDTO user) {
			super();
			this.user = user;
		}

		//OAuth용
		public MemberPrincipal(MemberDTO user, Map<String, Object> attributes) {
			super();
			this.user = user;
			this.attributes = attributes;
		}



		@Override
		public Collection<? extends GrantedAuthority> getAuthorities() {
			Collection<GrantedAuthority> collection = new ArrayList<>();
			MemberPrincipal self = this;
			collection.add(new GrantedAuthority(){
				@Override
				public String getAuthority() {
					return self.user.getRole().getValue();
				}
			});
			return collection;
		}


		@Override
		public String getPassword() {
			return this.user.getPw();
		}
		@Override
		public String getUsername() {
			return this.user.getUserID();
		}
		/**
		 * 계정 만료 여부
		 * true : 만료 안됨
		 * false : 만료
		 * @return
		 */
		@Override
		public boolean isAccountNonExpired() {
			return true;
		}
		/**
		 * 계정 잠김 여부
		 * true : 잠기지 않음
		 * false : 잠김
		 * @return
		 */
		@Override
		public boolean isAccountNonLocked() {
			return this.locked;
		}
		/**
		 * 비밀번호 만료 여부
		 * true : 만료 안됨
		 * false : 만료
		 * @return
		 */
		@Override
		public boolean isCredentialsNonExpired() {
			return true;
		}
		/**
		 * 사용자 활성화 여부
		 * ture : 활성화
		 * false : 비활성화
		 * @return
		 */
		@Override
		public boolean isEnabled() {
			return !this.locked;
		}

		//OAuth2
		@Override
		public Map<String, Object> getAttributes() {
			return attributes;
		}
		//OAuth2
		@Override
		public String getName() {
			//return this.user.getUserID();
			return this.attributes.get("sub").toString();
		}
}
