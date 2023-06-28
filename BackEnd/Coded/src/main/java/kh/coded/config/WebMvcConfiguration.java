package kh.coded.config;

import java.io.IOException;

import jakarta.servlet.ServletContext;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

@Configuration
public class WebMvcConfiguration implements WebMvcConfigurer {

	@Autowired
	private ServletContext servletContext;

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {

		// 리액트에서 참조할 image 태그의 src 요소를 지정
		// servletContext를 통한 realPath로 파일을 저장
		// 보안 상의 이유로 제한될 수 있으니 무조건 제약 사항을 확인
		String realPath = servletContext.getRealPath("images");
		registry.addResourceHandler("/images/**")
		.addResourceLocations("file:///"+realPath+"/")
		.setCachePeriod(0);

		registry.addResourceHandler("/**")
		.addResourceLocations("classpath:/static/")
		.resourceChain(true)
		.addResolver(new PathResourceResolver() {
			@Override
			protected Resource getResource(String resourcePath, Resource location) throws IOException {
				Resource requestedResource = location.createRelative(resourcePath);
				return requestedResource.exists() && requestedResource.isReadable() ? requestedResource
						: new ClassPathResource("/static/index.html");
			}
		});
	}

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
		.allowedOrigins("http://localhost:3000","http://192.168.50.218:3000" )
		.allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
		.allowCredentials(true)
		.maxAge(3600);
	}

}
